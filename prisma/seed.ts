import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const categories = [
    { name: "ทุเรียน", slug: "durian", unit: "กก.", priceMin: 120, priceMax: 180 },
    { name: "ล้างจาง", slug: "langsat", unit: "กก.", priceMin: 40, priceMax: 60 },
    { name: "มังคุด", slug: "mangosteen", unit: "กก.", priceMin: 80, priceMax: 120 },
    { name: "ลำไย", slug: "longan", unit: "กก.", priceMin: 50, priceMax: 80 },
    { name: "มะม่วง", slug: "mango", unit: "กก.", priceMin: 60, priceMax: 100 },
    { name: "มะนาว", slug: "lime", unit: "กก.", priceMin: 30, priceMax: 50 },
  ];

  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { id: cat.slug },
      update: { name: cat.name },
      create: { id: cat.slug, name: cat.name },
    });

    await prisma.product.upsert({
      where: { id: cat.slug },
      update: { name: cat.name, unit: cat.unit, categoryId: category.id },
      create: {
        id: cat.slug,
        name: cat.name,
        unit: cat.unit,
        categoryId: category.id,
      },
    });

    console.log(`  ✅ ${cat.name} (${cat.slug})`);
  }

  const buyer = await prisma.user.upsert({
    where: { id: "demo-buyer" },
    update: {},
    create: {
      id: "demo-buyer",
      phone: "0812345678",
      email: "buyer@agriforward.app",
      displayName: "สมชาย ซื้อของ",
      role: "BUYER",
    },
  });

  const seller = await prisma.user.upsert({
    where: { id: "demo-seller" },
    update: {},
    create: {
      id: "demo-seller",
      phone: "0898765432",
      email: "seller@agriforward.app",
      displayName: "วิภา สวนผลไม้",
      farmName: "สวนวิภา",
      role: "SELLER",
    },
  });

  await prisma.userWallet.upsert({
    where: { id: "wallet-buyer" },
    update: {},
    create: { id: "wallet-buyer", userId: buyer.id, balance: new Decimal(50000) },
  });

  await prisma.userWallet.upsert({
    where: { id: "wallet-seller" },
    update: {},
    create: { id: "wallet-seller", userId: seller.id, balance: new Decimal(15000) },
  });

  const openOrders = [
    { productId: "durian", quantity: 500, targetPrice: 150, buyerId: buyer.id },
    { productId: "mangosteen", quantity: 300, targetPrice: 95, buyerId: buyer.id },
    { productId: "mango", quantity: 200, targetPrice: 80, buyerId: buyer.id },
    { productId: "longan", quantity: 400, targetPrice: 65, buyerId: buyer.id },
    { productId: "langsat", quantity: 250, targetPrice: 50, buyerId: buyer.id },
    { productId: "lime", quantity: 100, targetPrice: 40, buyerId: buyer.id },
  ];

  for (const ord of openOrders) {
    const po = await prisma.purchaseOrder.create({
      data: {
        buyerId: ord.buyerId,
        productId: ord.productId,
        quantity: new Decimal(ord.quantity),
        targetPrice: new Decimal(ord.targetPrice),
        deliveryOption: "SELF_PICKUP",
        status: "Open",
        publishedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    const product = await prisma.product.findUnique({ where: { id: ord.productId } });
    if (product) {
      const pricePerUnit = ord.targetPrice - 5;
      const totalPrice = new Decimal(pricePerUnit).mul(ord.quantity);
      const depositAmount = Decimal.min(totalPrice.mul(0.05), new Decimal(1000));

      await prisma.offer.create({
        data: {
          orderId: po.id,
          sellerId: seller.id,
          pricePerUnit: new Decimal(pricePerUnit),
          totalPrice,
          depositAmount,
          notes: `${product.name} ระดับ A ส่งได้ทันที`,
          status: "Open",
          depositPaid: false,
        },
      });
    }

    console.log(`  📋 งานซื้อ ${ord.productId} ${ord.quantity} กก. @ ${ord.targetPrice} บาท`);
  }

  // Add watchlist entries for buyer
  await prisma.productWatch.upsert({
    where: { userId_productId: { userId: buyer.id, productId: "durian" } },
    update: {},
    create: { userId: buyer.id, productId: "durian" },
  });
  await prisma.productWatch.upsert({
    where: { userId_productId: { userId: buyer.id, productId: "longan" } },
    update: {},
    create: { userId: buyer.id, productId: "longan" },
  });

  console.log("✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });