"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

const chartData = [
  { month: "فرو", steel: 186, concrete: 80, machinery: 45 },
  { month: "اسف", steel: 305, concrete: 200, machinery: 78 },
  { month: "خرد", steel: 237, concrete: 120, machinery: 92 },
  { month: "تیر", steel: 173, concrete: 190, machinery: 65 },
  { month: "مرد", steel: 209, concrete: 130, machinery: 88 },
  { month: "شهر", steel: 214, concrete: 140, machinery: 95 },
];

const revenueData = [
  { month: "فرو", revenue: 240 },
  { month: "اسف", revenue: 180 },
  { month: "خرد", revenue: 320 },
  { month: "تیر", revenue: 285 },
  { month: "مرد", revenue: 390 },
  { month: "شهر", revenue: 350 },
];

function SimpleBarChart({ data }: { data: typeof chartData }) {
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.steel, d.concrete, d.machinery)),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-6 space-x-reverse text-sm">
        <div className="flex items-center space-x-2 space-x-reverse">
          <span>فولاد</span>
          <div className="h-3 w-3 rounded bg-blue-500"></div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <span>بتن</span>
          <div className="h-3 w-3 rounded bg-green-500"></div>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <span>ماشین‌آلات</span>
          <div className="h-3 w-3 rounded bg-purple-500"></div>
        </div>
      </div>
      <div className="flex h-64 items-end justify-between space-x-2 space-x-reverse">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-1 flex-col items-center space-y-2"
          >
            <div className="flex h-48 items-end space-x-1 space-x-reverse">
              <div
                className="w-4 rounded-t bg-purple-500 transition-all duration-300"
                style={{ height: `${(item.machinery / maxValue) * 100}%` }}
                title={`ماشین‌آلات: ${item.machinery}`}
              ></div>
              <div
                className="w-4 rounded-t bg-green-500 transition-all duration-300"
                style={{ height: `${(item.concrete / maxValue) * 100}%` }}
                title={`بتن: ${item.concrete}`}
              ></div>
              <div
                className="w-4 rounded-t bg-blue-500 transition-all duration-300"
                style={{ height: `${(item.steel / maxValue) * 100}%` }}
                title={`فولاد: ${item.steel}`}
              ></div>
            </div>
            <span className="text-xs text-gray-600">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleLineChart({ data }: { data: typeof revenueData }) {
  const maxValue = Math.max(...data.map((d) => d.revenue));
  const minValue = Math.min(...data.map((d) => d.revenue));

  return (
    <div className="space-y-4">
      <div className="relative h-64">
        <svg className="h-full w-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 40}
              x2="400"
              y2={i * 40}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Line path */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points={data
              .map((item, index) => {
                const x = (index / (data.length - 1)) * 380 + 10;
                const y =
                  180 -
                  ((item.revenue - minValue) / (maxValue - minValue)) * 160;
                return `${x},${y}`;
              })
              .join(" ")}
          />

          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 380 + 10;
            const y =
              180 - ((item.revenue - minValue) / (maxValue - minValue)) * 160;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all"
              >
                <title>{`${item.month}: ${item.revenue} تومان`}</title>
              </circle>
            );
          })}
        </svg>

        {/* X-axis labels */}
        <div className="mt-2 flex justify-between px-2">
          {data.map((item, index) => (
            <span key={index} className="text-xs text-gray-600">
              {item.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">نمودارها</h1>
        <p className="mt-2 text-gray-600">تحلیل‌ها و معیارهای عملکرد</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>فروش محصولات صنعتی</CardTitle>
            <CardDescription>
              مقایسه ماهانه فروش محصولات اصلی گروه انتخاب
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={chartData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>روند درآمد (میلیارد ریال)</CardTitle>
            <CardDescription>درآمد ماهانه باشگاه مشتریان</CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleLineChart data={revenueData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>نرخ رضایت مشتری</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-green-600">
                ۹۲.۵%
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-600"
                  style={{ width: "24.5%" }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                +۳.۱% نسبت به ماه گذشته
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نرخ بازگشت سفارش</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-red-600">۲.۳%</div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-red-600"
                  style={{ width: "42.3%" }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                -۰.۸% نسبت به ماه گذشته
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مشتریان جدید</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold text-blue-600">۱۸۷</div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: "89%" }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                +۲۵% نسبت به ماه گذشته
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
