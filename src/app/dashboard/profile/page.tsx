import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Mail, Phone, MapPin, Calendar, Edit, User } from "lucide-react";

export default function UserInfoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">اطلاعات کاربر</h1>
        <p className="mt-2 text-gray-600">
          مدیریت پروفایل و تنظیمات حساب کاربری
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>اطلاعات پروفایل</CardTitle>
            <CardDescription>جزئیات شخصی و اطلاعات تماس شما</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  مهندس رضا کریمی
                </h3>
                <p className="text-sm text-gray-600">
                  مدیر خرید شرکت ساختمانی پارس
                </p>
                <span className="bg-gold-100 text-gold-800 mt-1 inline-block rounded-full px-2 py-1 text-xs font-medium">
                  مشتری طلایی
                </span>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <User className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm text-gray-700">
                  reza.karimi@parsco.ir
                </span>
                <Mail className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm text-gray-700">۰۲۱-۸۸۷۷۶۶۵۵</span>
                <Phone className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm text-gray-700">تهران، منطقه ۲</span>
                <MapPin className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <span className="text-sm text-gray-700">عضویت از مهر ۱۴۰۱</span>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            </div>

            <Button className="w-full">
              <span>ویرایش پروفایل</span>
              <Edit className="mr-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>آمار حساب کاربری</CardTitle>
            <CardDescription>فعالیت و معیارهای استفاده شما</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">۴۸</div>
                <div className="text-sm text-gray-600">سفارش</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  ۲.۸ میلیارد
                </div>
                <div className="text-sm text-gray-600">کل خرید (ریال)</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-green-600">۹۵%</div>
                <div className="text-sm text-gray-600">رضایت</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">۱۲</div>
                <div className="text-sm text-gray-600">پروژه فعال</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">
                    ۱۲.۴ میلیارد / ۵۰ میلیارد ریال
                  </span>
                  <span className="text-gray-700">اعتبار استفاده شده</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                    style={{ width: "24%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-gray-600">۲۸ / ۱۰۰</span>
                  <span className="text-gray-700">سفارشات این ماه</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-green-600 transition-all duration-300"
                    style={{ width: "84%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>فعالیت‌های اخیر</CardTitle>
          <CardDescription>آخرین اقدامات و به‌روزرسانی‌های شما</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "سفارش ۲۰ تن میلگرد ثبت شد",
                date: "۲ ساعت پیش",
                type: "order",
              },
              {
                action: "پرداخت فاکتور ۱۲۳۴۵ تایید شد",
                date: "۱ روز پیش",
                type: "payment",
              },
              {
                action: "درخواست تخفیف ویژه ارسال شد",
                date: "۲ روز پیش",
                type: "request",
              },
              {
                action: "بازدید از کارخانه رزرو شد",
                date: "۱ هفته پیش",
                type: "visit",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-100 py-3 last:border-b-0"
              >
                <span className="text-xs text-gray-500">{activity.date}</span>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <span className="text-sm text-gray-900">
                    {activity.action}
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      activity.type === "profile"
                        ? "bg-blue-500"
                        : activity.type === "project"
                          ? "bg-green-500"
                          : activity.type === "task"
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
