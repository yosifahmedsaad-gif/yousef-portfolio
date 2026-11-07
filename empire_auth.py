import os
import time

def imperial_terminal_session():
    print("=== [ IMPERIAL CONTROL ROOM: SECURE AUTH ] ===")
    
    # طلب إدخال الـ API Key من الـ Terminal
    api_key = input("أدخل الـ API Key الخاص بك يا إمبراطور: ").strip()
    
    if not api_key:
        print("[-] خطأ: لم يتم ادخال مفتاح صالح!")
        return

    # حفظ المفتاح مؤقتاً في متغيرات البيئة للجلسة الحالية
    os.environ["IMPERIAL_API_KEY"] = api_key
    print("[+] تم تحميل الـ API Key بنجاح في بيئة Anti-Gravity!")
    print("[*] جاري تشغيل الأنظمة والعمليات...")
    
    # محاكاة وقت التشغيل (يمكنك استبدال هذا الجزء بتشغيل مشروعك الفعلي)
    try:
        # افتراض أن الجلسة أو الصلاحية ستنتهي بعد فترة أو تفقد الاتصال
        time.sleep(10) # زوّد الوقت أو اجعله مربوطاً بمدة الجلسة اللي تحبها
        
        # انتهاء صلاحية المفتاح وهمياً أو تلقائياً
        raise TimeoutError("API Key Expired")
        
    except KeyboardInterrupt:
        print("\n[!] تم إيقاف الجلسة يدويًا بواسطة الإمبراطور.")
    except Exception:
        print("\n[!] تنبيه هام: لقد انتهت صلاحية الـ API Key، يرجى التجديد!")
        # حذف المفتاح من الذاكرة فوراً للأمان
        if "IMPERIAL_API_KEY" in os.environ:
            del os.environ["IMPERIAL_API_KEY"]
        print("[-] تم مسح المفتاح من الذاكرة الحالية للأمان.")

if __name__ == "__main__":
    imperial_terminal_session()