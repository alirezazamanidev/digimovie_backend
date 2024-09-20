export enum AuthMessage {
    NotExpiredOtp = 'کد تایید هنوز منقضی نشده است!',
    NotFoundAccount = 'اکانت کاربر یافت نشد',
    OtpCodeIsIncorrect = 'کد تایید ارسال شده صحیح نمی باشد',
    LoginIsRequired = 'وارد حساب کاربری خود شوید',
    ExpiredCode = 'کد تایید منقصی شده مجددا تلاش کنید.',
    TryAgain = 'دوباره تلاش کنید',
    EmailOrPasswordIncurrent = 'ایمیل یا پسورد وارد شده نادرست است!',
    LoginAgain = 'مجددا وارد حساب کاربری خود شوید',
  }
  export enum PublicMessage {
    SignUp='با موفقیت ثبت نام شدید!',
    SendOtp = 'کد تایید با موفقیت ارسال شد',
    LoggedIn = 'با موفقیت وارد حساب کاربری خود شدید',
    Logout = 'با موفقیت از حساب کاربری خود خارج شدید!',
    Created = 'با موفقیت ایجاد شد!',
    Updated = 'ویرایش با موفقیت انحام شد!',
    ChargeWallet = 'کیف پول با موفقیت شارژ شد!',
    Deleted = 'با موفقیت حذف شد!',
    Bookmarked = 'سیو شد!',
    UnBookmarked = 'از سیو خارج شد!',
    Update_Package = 'پکیج با موفقیت آپدیت شد!',
    Created_violation = 'گزارش شما برای پست مورد نظر با موفقیت ثبت شد!',
    SendResume = 'رزومه شما با موفقیت به اگهی مورد نظر ارسال شد!',
    ChangeStatusResume = 'رزومه مورد نظر با موفقیت تغییر وضعیت داده شد!',
    buyPackage='پکیح با موفقیت خریداری شد!',
    ChangeFullname='نام کاربری شما با موفقیت ثبت شد!',
    CreateREquestUs='درخواست شما با موفقیت ثبت شد!'
  }
  export enum BadRequestMessage {
    InvalidCategories = 'دسته بندی ها را به درستی وارد کنید!',
    NotMonyInWallet = 'مبلغ کیف پول شما  برای ایجاد اگهی کافی نمی باشد! لطفا برای شارژ کیف پول اقدام نمایید!',
    ActiveCodeExpired='اعتبار لینک فعال سازی به پایان رسیده است!',
    AlreadyUsedActiveCode='این لینک قبلا مورد استفاده قرار گرفته است!'
  }
  export enum NotFoundMessage {
    NotFound = 'موردی یافت نشد!',
    Category = 'دسته بندی یافت نشد!',
    ActiveCode='لینک فعال سازی یافت نشد!',
    User = 'کاربری یافت نشد!',
    Option='اپشن یاخت نشد!',
    Post='آگهی یافت نشد!',
    Package='پکیجی یافت نشد!',
    Conversartion='چت یافت نشد',
    Slider='اسلایدری یافت نشد!'
  }
  export enum ValidationMesaage {
    Image = 'فرمت تصویر  یا ویدعو  صحیح  نیست!',
  }
  
  export enum ConflictMessage {
    Account='اکانت شما قیلا با این مشخصات ثبت شده است لطفا وارد سایت شوید',
    Username='نام کاربری قبلا ثبت شده است!',
    Resume = 'رزومه شما قبلا برای این آگهی ارسال شده است!',
    Title = 'چنین موردی قبلا با این عنوان ثبت شده است!',
    Slug = 'چنین موردی قبلا با این اسلاگ ایجاد شده است!',
  }
  