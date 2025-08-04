import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            المنتج غير موجود
          </h1>
          <p className="text-gray-600 mb-8">
            عذراً، المنتج الذي تبحث عنه غير موجود أو تم حذفه
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            العودة للصفحة الرئيسية
          </Link>
          
          <div>
            <Link 
              href="/products"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              تصفح جميع المنتجات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 