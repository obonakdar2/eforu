import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "کل مشتریان فعال",
      value: "۱۲,۸۴۵",
      change: "+۱۵.۳% نسبت به ماه گذشته",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "فروش ماهانه",
      value: "۲۸۵.۴ میلیارد ریال",
      change: "+۲۲.۱% نسبت به ماه گذشته",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "سفارشات جدید",
      value: "+۴۳۷",
      change: "+۱۸% نسبت به هفته گذشته",
      icon: CreditCard,
      color: "text-purple-600",
    },
    {
      title: "مشتریان آنلاین",
      value: "+۱۲۳",
      change: "+۳۵ از ساعت گذشته",
      icon: Activity,
      color: "text-orange-600",
    },
  ];

  return (
    <div dir="rtl" className="space-y-6 text-right">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">نمای کلی داشبورد</h1>
        <p className="mt-2 text-gray-600">به داشبورد تحلیلی خود خوش آمدید</p>
      </div>

      {/* آمار اصلی */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-row-reverse items-center justify-between">
                <div className={`rounded-full bg-gray-100 p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* فعالیت‌ها و اقدامات سریع */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* فعالیت‌های اخیر */}
        <Card>
          <CardHeader>
            <CardTitle>فعالیت‌های اخیر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "مشتری جدید از تهران ثبت نام کرد",
                  time: "۵ دقیقه پیش",
                },
                { action: "سفارش ۵۰ تن فولاد تایید شد", time: "۱۵ دقیقه پیش" },
                {
                  action: "پرداخت ۱۲ میلیون تومان دریافت شد",
                  time: "۳۰ دقیقه پیش",
                },
                { action: "گزارش فروش ماهانه تولید شد", time: "۱ ساعت پیش" },
                { action: "مشتری VIP جدید اضافه شد", time: "۲ ساعت پیش" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-row-reverse items-center justify-between py-2"
                >
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  <span className="text-sm text-gray-900">
                    {activity.action}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* اقدامات سریع */}
        <Card>
          <CardHeader>
            <CardTitle>اقدامات سریع</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  title: "مدیریت موجودی",
                  subtitle: "بررسی موجودی محصولات",
                },
                {
                  title: "سفارشات جدید",
                  subtitle: "مشاهده سفارشات در انتظار",
                },
                {
                  title: "گزارش فروش",
                  subtitle: "آمار فروش محصولات",
                },
                {
                  title: "مشتریان VIP",
                  subtitle: "مدیریت مشتریان ویژه",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className="rounded-lg border border-gray-200 p-4 text-right transition-colors hover:bg-gray-50"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {item.subtitle}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
