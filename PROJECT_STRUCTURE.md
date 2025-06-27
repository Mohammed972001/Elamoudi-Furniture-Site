# هيكل المشروع - بيت السجاد

## 📁 التنظيم الجديد للملفات

```
src/
├── app/
│   ├── layout.tsx           # تخطيط المشروع الرئيسي
│   ├── page.tsx            # الصفحة الرئيسية
│   └── globals.css         # الأنماط العامة
├── components/
│   ├── index.ts            # تصدير جميع المكونات
│   └── navbar/             # مكونات شريط التنقل
│       ├── index.tsx       # المكون الرئيسي
│       ├── Logo.tsx        # شعار الموقع
│       ├── DesktopNavigation.tsx  # قائمة سطح المكتب
│       ├── SearchBar.tsx   # شريط البحث
│       ├── ActionIcons.tsx # مجموعة الأيقونات
│       ├── FavoriteButton.tsx     # زر المفضلة
│       ├── CartButton.tsx  # زر السلة
│       ├── MobileMenuButton.tsx   # زر قائمة الموبايل
│       ├── MobileMenu.tsx  # قائمة الموبايل
│       └── README.md       # توثيق المكونات
├── constants/
│   └── navigation.ts       # ثوابت التنقل والتطبيق
├── types/
│   └── index.ts           # جميع أنواع TypeScript
└── data/
    └── (بيانات المستقبل)
```

## 🎯 المميزات الجديدة

### 1. فصل المكونات
- كل component في ملف منفصل
- سهولة الصيانة والتطوير
- إمكانية إعادة الاستخدام

### 2. تنظيم الأنواع
- جميع TypeScript interfaces في مكان واحد
- نوع مركزي للمشاركة بين المكونات

### 3. إدارة الثوابت
- فصل البيانات الثابتة عن المنطق
- سهولة التعديل والإضافة

### 4. تحسين الـ Imports
```tsx
// قبل:
import Navbar from '@/components/navbar'

// بعد:
import { Navbar, Logo, SearchBar } from '@/components'
```

## 🔧 كيفية إضافة مكون جديد

### 1. إنشاء المكون
```tsx
// src/components/NewComponent.tsx
const NewComponent = () => {
  return <div>مكون جديد</div>
}

export default NewComponent
```

### 2. إضافته للـ index
```tsx
// src/components/index.ts
export { default as NewComponent } from './NewComponent'
```

### 3. الاستخدام
```tsx
import { NewComponent } from '@/components'
```

## 📊 إحصائيات

- **عدد ملفات الـ Components**: 9 ملفات منفصلة
- **حجم أكبر ملف**: ~1.4KB (index.tsx)
- **إجمالي أسطر الكود**: ~200 سطر منظم
- **مستوى التعقيد**: منخفض جداً

## 🚀 الخطوات التالية

1. ✅ إنشاء مكونات Footer
2. ✅ إنشاء مكونات ProductCard  
3. ✅ إنشاء صفحات الأقسام المختلفة
4. ✅ إضافة نظام إدارة الحالة (Context/Zustand)
5. ✅ إضافة API calls وإدارة البيانات

## 🎨 معايير التصميم

- **الألوان**: نظام Amber المحسن
- **الخط**: Cairo (عربي محسن)
- **الاستجابة**: Mobile-first approach
- **إمكانية الوصول**: ARIA labels كاملة
- **الأداء**: Components محسنة ومقسمة 