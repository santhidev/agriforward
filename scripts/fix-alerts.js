const fs = require("fs");

const files = [
  {
    path: "src/components/auth/LoginForm.tsx",
    importFrom: "{ Input, Button, Alert, Spinner }",
    importTo: "{ Input, Button, Alert, Spinner, useToast }",
    before: "const [phone",
    hook: "const { toast } = useToast();",
    search: 'alert("เข้าสู่ระบบสำเร็จ! (mock)")',
    replace: 'toast("เข้าสู่ระบบสำเร็จ", "success")',
  },
  {
    path: "src/components/auth/RegisterForm.tsx",
    importFrom: "{ Input, Button, Alert, Spinner, ProgressBar }",
    importTo: "{ Input, Button, Alert, Spinner, ProgressBar, useToast }",
    before: "const [step",
    hook: "const { toast } = useToast();",
    search: 'alert("สมัครใช้งานสำเร็จ! (mock)")',
    replace: 'toast("สมัครใช้งานสำเร็จ", "success")',
  },
  {
    path: "src/app/orders/new/page.tsx",
    importFrom: "{ Input, Button, Card, CardBody }",
    importTo: "{ Input, Button, Card, CardBody, useToast }",
    before: "const [quantity",
    hook: "const { toast } = useToast();",
    search: 'alert("สร้างงานซื้อสำเร็จ! (mock)")',
    replace: 'toast("สร้างงานซื้อสำเร็จ", "success")',
  },
  {
    path: "src/app/offers/new/page.tsx",
    importFrom: "{ Card, CardBody, CardHeader, CardTitle }",
    importTo: "{ Card, CardBody, CardHeader, CardTitle, useToast }",
    before: "const [loading",
    hook: "const { toast } = useToast();",
    search: 'alert("เสนอขาย " + data.pricePerUnit + " บาท/กก. สำเร็จ! (mock)")',
    replace: 'toast("เสนอขาย " + data.pricePerUnit + " บาท/กก. สำเร็จ", "success")',
  },
  {
    path: "src/app/orders/[id]/checkout/page.tsx",
    importFrom: "{ Card, CardBody, CardHeader, CardTitle, Button }",
    importTo: "{ Card, CardBody, CardHeader, CardTitle, Button, useToast }",
    before: "const [delivery",
    hook: "const { toast } = useToast();",
    search: 'alert("ชำระเงินสำเร็จ! (mock)")',
    replace: 'toast("ชำระเงินสำเร็จ", "success")',
  },
];

for (const f of files) {
  let content = fs.readFileSync(f.path, "utf8");
  content = content.replace(f.importFrom + " from", f.importTo + " from");
  content = content.replace(f.before, f.hook + "\n  " + f.before);
  content = content.replace(f.search, f.replace);
  fs.writeFileSync(f.path, content);
  console.log(f.path, "✅");
}
