const mobileMenu = document.getElementById('mobileMenu');
const vaultSearch = document.getElementById('vaultSearch');
const vaultList = document.getElementById('vaultList');
const addCredential = document.getElementById('addCredential');
const toast = document.getElementById('toast');
let activeFilter = 'all';

function applyFilters() {
  if (!vaultSearch) return;
  const query = vaultSearch.value.trim().toLowerCase();
  document.querySelectorAll('.credential-item').forEach(item => {
    const matchesSearch = item.dataset.name.includes(query);
    const matchesCategory = activeFilter === 'all' || item.dataset.category === activeFilter;
    item.classList.toggle('hidden', !(matchesSearch && matchesCategory));
  });
}

if (vaultSearch) {
  vaultSearch.addEventListener('input', applyFilters);
}

document.querySelectorAll('.category-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.category-tab').forEach(button => button.classList.remove('active'));
    tab.classList.add('active');
    activeFilter = tab.dataset.filter;
    applyFilters();
  });
});

function bindPasswordToggle(button) {
  button.addEventListener('click', () => {
    const showing = button.dataset.showing === 'true';
    button.textContent = showing ? '••••••••' : button.dataset.password;
    button.dataset.showing = String(!showing);
  });
}

document.querySelectorAll('.password-toggle').forEach(bindPasswordToggle);

if (addCredential && vaultList && toast) {
  addCredential.addEventListener('click', () => {
    const item = document.createElement('article');
    item.className = 'credential-item';
    item.dataset.name = 'adobe';
    item.dataset.category = 'work';
    item.innerHTML = `
      <div class="service-mark">A</div>
      <div><strong>Adobe</strong><span>creative@example.com</span></div>
      <button class="password-toggle" type="button" data-password="Ck!Adobe#26">••••••••</button>
    `;
    bindPasswordToggle(item.querySelector('.password-toggle'));
    vaultList.prepend(item);
    applyFilters();
    toast.classList.add('show');
    window.setTimeout(() => toast.classList.remove('show'), 1600);
  });
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const securityReadMoreButton = document.getElementById('securityReadMoreButton');
const securityReadMore = document.getElementById('securityReadMore');

if (securityReadMoreButton && securityReadMore) {
  securityReadMoreButton.addEventListener('click', () => {
    const isOpen = securityReadMoreButton.getAttribute('aria-expanded') === 'true';
    securityReadMoreButton.setAttribute('aria-expanded', String(!isOpen));
    securityReadMore.hidden = isOpen;
    updateSecurityReadMoreLabel();

    if (!isOpen) {
      window.setTimeout(() => {
        securityReadMore.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  });
}


// EN / VI language system
const VI_TEXT = {
  'Features': 'Tính năng',
  'Security': 'Bảo mật',
  'HOW IT WORKS': 'CÁCH HOẠT ĐỘNG',
  'How it works': 'Cách hoạt động',
  'About': 'Giới thiệu',
  'Log in': 'Đăng nhập',
  'Sign up': 'Đăng ký',
  'CHECKKEY PASSWORD MANAGER': 'TRÌNH QUẢN LÝ MẬT KHẨU CHECKKEY',
  'Your': 'Mật Khẩu',
  'Passwords.': 'Của Bạn.',
  'Impossible': 'Không Thể',
  'To hack.': 'Bị Hack.',
  'One calm place for the logins that matter. Save credentials, find accounts quickly and keep access under your control.': 'Một nơi đơn giản cho những tài khoản quan trọng. Lưu thông tin đăng nhập, tìm tài khoản nhanh chóng và luôn giữ quyền kiểm soát truy cập trong tay bạn.',
  'Explore features': 'Khám phá tính năng',
  'Encrypted vault': 'Kho được mã hóa',
  'Password history': 'Lịch sử mật khẩu',
  'Automatic lock': 'Tự động khóa',
  'AES-style encryption': 'Mã hóa kiểu AES',
  'Vault protected': 'Kho đã được bảo vệ',
  'VAULT OPEN': 'KHO ĐANG MỞ',
  'MY VAULT': 'KHO CỦA TÔI',
  'Saved accounts': 'Tài khoản đã lưu',
  'All': 'Tất cả',
  'Work': 'Công việc',
  'Social': 'Mạng xã hội',
  'Finance': 'Tài chính',
  'Synced just now': 'Vừa đồng bộ',
  '4 accounts': '4 tài khoản',
  'CORE FEATURES': 'TÍNH NĂNG CỐT LÕI',
  'Everything you need to manage passwords clearly.': 'Mọi thứ bạn cần để quản lý mật khẩu một cách rõ ràng.',
  'Three focused tools keep your credentials organized, easy to find and under your control.': 'Ba công cụ tập trung giúp thông tin đăng nhập của bạn được sắp xếp gọn gàng, dễ tìm và luôn trong tầm kiểm soát.',
  'Credential Vault': 'Kho thông tin đăng nhập',
  'Save, edit and organize usernames, emails, passwords and notes in one private place.': 'Lưu, chỉnh sửa và sắp xếp tên người dùng, email, mật khẩu và ghi chú trong một nơi riêng tư.',
  'Emergency Access': 'Quyền truy cập khẩn cấp',
  'Give a trusted person secure access to your vault during an emergency.': 'Cho phép một người đáng tin cậy truy cập an toàn vào kho mật khẩu của bạn trong trường hợp khẩn cấp.',
  'Device Control': 'Kiểm soát thiết bị',
  'See which devices can access your vault and remove access from devices you no longer trust.': 'Xem những thiết bị có thể truy cập kho mật khẩu và thu hồi quyền truy cập từ các thiết bị bạn không còn tin cậy.',
  'Useful by default.': 'Hữu ích ngay từ đầu.',
  'Simple tools arranged around one private vault, without turning password management into another complicated dashboard.': 'Các công cụ đơn giản được sắp xếp quanh một kho riêng tư, giúp việc quản lý mật khẩu không trở thành một bảng điều khiển phức tạp khác.',
  'Private password vault': 'Kho mật khẩu riêng tư',
  'Save platform names, usernames, emails, passwords and notes in one organized place.': 'Lưu tên nền tảng, tên người dùng, email, mật khẩu và ghi chú trong một nơi được sắp xếp rõ ràng.',
  'Search and filters': 'Tìm kiếm và bộ lọc',
  'Find an account by platform or category instead of scrolling through a crowded list.': 'Tìm tài khoản theo nền tảng hoặc danh mục thay vì cuộn qua một danh sách dài.',
  'Keep a record of previous passwords so updated credentials are easier to review and avoid reusing.': 'Lưu lại các mật khẩu cũ để dễ kiểm tra khi cập nhật thông tin đăng nhập và tránh sử dụng lại.',
  'Multi-device access': 'Truy cập nhiều thiết bị',
  'Access the same encrypted credential data across supported devices through a secure API.': 'Truy cập cùng một dữ liệu đăng nhập đã mã hóa trên các thiết bị được hỗ trợ thông qua API bảo mật.',
  'SECURITY FIRST': 'ƯU TIÊN BẢO MẬT',
  'Your vault should protect itself.': 'Kho mật khẩu phải tự bảo vệ được chính nó.',
  'See how CheckKey keeps your master password and plain passwords separate from the encrypted data it stores.': 'Xem cách CheckKey tách mật khẩu chính và mật khẩu dạng đọc được khỏi dữ liệu mã hóa được lưu trữ.',
  'Read more about security': 'Xem thêm về bảo mật',
  'A CLOSER LOOK': 'XEM KỸ HƠN',
  'How CheckKey protects your passwords': 'CheckKey bảo vệ mật khẩu của bạn như thế nào',
  'CheckKey is designed so that your passwords are protected before they are stored. Instead of sending readable passwords directly to storage, CheckKey encrypts them on your device first.': 'CheckKey được thiết kế để bảo vệ mật khẩu trước khi chúng được lưu trữ. Thay vì gửi mật khẩu ở dạng đọc được trực tiếp đến nơi lưu trữ, CheckKey mã hóa chúng ngay trên thiết bị của bạn trước.',
  'This means the information stored by CheckKey is not the password you originally entered, but an encrypted version that cannot be understood without the correct decryption key.': 'Điều này có nghĩa dữ liệu CheckKey lưu không phải là mật khẩu bạn nhập ban đầu, mà là phiên bản đã mã hóa và không thể đọc nếu không có khóa giải mã đúng.',
  'Your password is encrypted on your device': 'Mật khẩu được mã hóa trên thiết bị của bạn',
  'When you save a password, encryption happens directly on your device before the information is uploaded.': 'Khi bạn lưu mật khẩu, quá trình mã hóa diễn ra trực tiếp trên thiết bị trước khi dữ liệu được tải lên.',
  'What you enter': 'Bạn nhập',
  'What leaves your device': 'Dữ liệu rời thiết bị',
  "The readable password does not need to be stored as plain text in CheckKey's database. This reduces the amount of readable sensitive information leaving your device.": 'Mật khẩu dạng đọc được không cần lưu dưới dạng văn bản thuần trong cơ sở dữ liệu của CheckKey. Điều này giúp giảm lượng thông tin nhạy cảm có thể đọc được rời khỏi thiết bị của bạn.',
  'CheckKey stores encrypted data': 'CheckKey lưu dữ liệu đã mã hóa',
  "After encryption, only the encrypted version is sent to CheckKey's storage.": 'Sau khi mã hóa, chỉ phiên bản đã mã hóa được gửi đến nơi lưu trữ của CheckKey.',
  'Readable example': 'Ví dụ dạng đọc được',
  'Stored encrypted value': 'Giá trị mã hóa được lưu',
  'Encrypted data is intentionally unreadable without the information required to decrypt it. For CheckKey to truthfully say that it cannot read your passwords, the system must also be designed so that CheckKey does not have access to your decryption key.': 'Dữ liệu mã hóa được thiết kế để không thể đọc nếu thiếu thông tin cần thiết để giải mã. Để CheckKey thực sự không thể đọc mật khẩu của bạn, hệ thống cũng phải được thiết kế sao cho CheckKey không có quyền truy cập khóa giải mã.',
  'Your password becomes readable only when you need it': 'Mật khẩu chỉ trở nên đọc được khi bạn cần',
  'When you want to view a saved password, CheckKey retrieves the encrypted data and sends it back to your device. The decryption process then happens on your device.': 'Khi bạn muốn xem mật khẩu đã lưu, CheckKey lấy dữ liệu mã hóa và gửi lại thiết bị của bạn. Quá trình giải mã sau đó diễn ra trên chính thiết bị đó.',
  'Encrypted storage': 'Kho lưu trữ mã hóa',
  'Your device + your key': 'Thiết bị + khóa của bạn',
  'Readable password': 'Mật khẩu đọc được',
  "The purpose of this model is to keep readable passwords on the user's side rather than making them continuously readable to the storage provider.": 'Mục tiêu của mô hình này là giữ mật khẩu dạng đọc được ở phía người dùng thay vì để nhà cung cấp lưu trữ có thể đọc chúng liên tục.',
  'Can CheckKey read my passwords?': 'CheckKey có thể đọc mật khẩu của tôi không?',
  'If CheckKey uses client-side encryption and does not possess the decryption key, the host only receives and stores encrypted information.': 'Nếu CheckKey sử dụng mã hóa phía người dùng và không giữ khóa giải mã, máy chủ chỉ nhận và lưu thông tin đã mã hóa.',
  'You know the password. CheckKey stores the encrypted version.': 'Bạn biết mật khẩu. CheckKey chỉ lưu phiên bản đã mã hóa.',
  'The exact protection depends on how CheckKey manages encryption keys, authentication and account recovery, which are critical parts of the final security architecture.': 'Mức độ bảo vệ thực tế phụ thuộc vào cách CheckKey quản lý khóa mã hóa, xác thực và khôi phục tài khoản — những phần quan trọng của kiến trúc bảo mật hoàn chỉnh.',
  'What if someone accesses stored data?': 'Nếu ai đó truy cập được dữ liệu đã lưu thì sao?',
  'Your passwords remain encrypted. CheckKey never stores your passwords as readable text. Before a password is uploaded, it is encrypted directly on your device.': 'Mật khẩu của bạn vẫn được mã hóa. CheckKey không lưu mật khẩu dưới dạng văn bản đọc được. Trước khi được tải lên, mật khẩu được mã hóa trực tiếp trên thiết bị của bạn.',
  '↓ encrypt': '↓ mã hóa',
  'Stored data ≠ readable passwords.': 'Dữ liệu đã lưu ≠ mật khẩu đọc được.',
  'Without your decryption key, the stored information remains encrypted.': 'Không có khóa giải mã của bạn, dữ liệu đã lưu vẫn ở trạng thái mã hóa.',
  'What protects your decryption key?': 'Điều gì bảo vệ khóa giải mã của bạn?',
  'Your key stays with you. It is kept separate from the encrypted passwords stored by CheckKey and is not uploaded alongside your password data in a form that allows CheckKey to decrypt it.': 'Khóa của bạn luôn ở phía bạn. Nó được tách khỏi mật khẩu mã hóa mà CheckKey lưu và không được tải lên cùng dữ liệu mật khẩu theo cách cho phép CheckKey giải mã.',
  'CheckKey stores the encrypted data. Your device holds the ability to read it.': 'CheckKey lưu dữ liệu mã hóa. Thiết bị của bạn giữ khả năng đọc dữ liệu đó.',
  'Who can read your passwords?': 'Ai có thể đọc mật khẩu của bạn?',
  'On your device': 'Trên thiết bị của bạn',
  'Your key + encrypted data → readable password': 'Khóa của bạn + dữ liệu mã hóa → mật khẩu đọc được',
  'On CheckKey': 'Trên CheckKey',
  'Encrypted data + no decryption key → unreadable': 'Dữ liệu mã hóa + không có khóa giải mã → không thể đọc',
  'Without your key': 'Không có khóa của bạn',
  'Encrypted data → remains encrypted': 'Dữ liệu mã hóa → vẫn được mã hóa',
  'PROTECTION THROUGHOUT THE JOURNEY': 'BẢO VỆ TRONG SUỐT QUÁ TRÌNH',
  'Your password is protected from the moment you save it to the moment you access it again.': 'Mật khẩu được bảo vệ từ lúc bạn lưu cho đến khi bạn truy cập lại.',
  'Before upload': 'Trước khi tải lên',
  'Your password is encrypted on your device before it leaves.': 'Mật khẩu được mã hóa trên thiết bị trước khi rời khỏi thiết bị.',
  'During transfer': 'Trong khi truyền',
  'Only the encrypted version of your password is sent for storage.': 'Chỉ phiên bản mật khẩu đã mã hóa được gửi đi để lưu trữ.',
  'While stored': 'Trong khi lưu trữ',
  'CheckKey stores encrypted password data rather than readable passwords.': 'CheckKey lưu dữ liệu mật khẩu đã mã hóa thay vì mật khẩu dạng đọc được.',
  'When you access it': 'Khi bạn truy cập',
  'The encrypted data returns to your device and is decrypted there using your key.': 'Dữ liệu mã hóa được gửi về thiết bị và được giải mã tại đó bằng khóa của bạn.',
  'At no point does CheckKey need your readable password in order to store it.': 'CheckKey không cần mật khẩu dạng đọc được của bạn tại bất kỳ thời điểm nào để lưu trữ dữ liệu.',
  'Your password. Your key. Your access.': 'Mật khẩu của bạn. Khóa của bạn. Quyền truy cập của bạn.',
  'ABOUT CHECKKEY': 'VỀ CHECKKEY',
  'A simpler way to keep your passwords under your control.': 'Một cách đơn giản hơn để giữ mật khẩu trong tầm kiểm soát của bạn.',
  'Secure, organised and always yours.': 'An toàn, được sắp xếp gọn gàng và luôn thuộc về bạn.',
  'Save, search and manage with ease.': 'Lưu, tìm kiếm và quản lý một cách dễ dàng.',
  'Your data stays encrypted and separate.': 'Dữ liệu của bạn luôn được mã hóa và tách biệt.',
  'Access anywhere, on your terms.': 'Truy cập mọi lúc, theo cách bạn muốn.',
  'Simple to use': 'Dễ sử dụng',
  'Private by design': 'Riêng tư ngay từ thiết kế',
  'Built for control': 'Được xây dựng để bạn kiểm soát',
  'HOW IT WORKS': 'CÁCH HOẠT ĐỘNG',
  'Start in three moves.': 'Bắt đầu trong ba bước.',
  'From sign-up to saving your first credential, the flow stays clear and predictable.': 'Từ lúc đăng ký đến khi lưu thông tin đăng nhập đầu tiên, quy trình luôn rõ ràng và dễ theo dõi.',
  'Create your account': 'Tạo tài khoản',
  'Sign up with your email and complete verification.': 'Đăng ký bằng email và hoàn tất xác minh.',
  'Protect your vault': 'Bảo vệ kho mật khẩu',
  'Set your master password and personal security question.': 'Thiết lập mật khẩu chính và câu hỏi bảo mật cá nhân.',
  'Save your credentials': 'Lưu thông tin đăng nhập',
  'Add accounts, search them later and manage password history.': 'Thêm tài khoản, tìm lại khi cần và quản lý lịch sử mật khẩu.',
  'Keep access simple.': 'Giữ việc truy cập đơn giản.',
  'Keep control yours.': 'Giữ quyền kiểm soát trong tay bạn.',
  'Your Passwords. Impossible To hack.': 'Mật khẩu của bạn. Không thể bị hack.',
  'Sample credential added': 'Đã thêm thông tin đăng nhập mẫu',
  'Language': 'Ngôn ngữ',
  'Devices & Access': 'Thiết bị & Quyền truy cập',
  'Current Device': 'Thiết bị hiện tại',
  'This device': 'Thiết bị này',
  'Other Devices': 'Thiết bị khác',
  'Current': 'Hiện tại',
  'Sign out all other devices': 'Đăng xuất tất cả thiết bị khác',
  'No other devices are currently connected.': 'Hiện không có thiết bị khác đang kết nối.',
  'Access control': 'Kiểm soát quyền truy cập',
  'Review your active devices and revoke access from devices you no longer use.': 'Xem các thiết bị đang hoạt động và thu hồi quyền truy cập khỏi những thiết bị bạn không còn sử dụng.',
  'Revoke Access': 'Thu hồi quyền truy cập',
  'Last active:': 'Hoạt động lần cuối:',
  'IP:': 'IP:',
  'Unknown device': 'Thiết bị không xác định',
  'Unknown browser': 'Trình duyệt không xác định',
  'Unknown OS': 'Hệ điều hành không xác định',
  'Unable to load device information.': 'Không thể tải thông tin thiết bị.',
  'Failed to revoke device access.': 'Không thể thu hồi quyền truy cập thiết bị.',
  'Failed to sign out other devices.': 'Không thể đăng xuất các thiết bị khác.',
  'Manage the devices that can access your CheckKey vault.': 'Quản lý các thiết bị có thể truy cập kho mật khẩu CheckKey của bạn.',
  'New Folders': "Thư mục Mới",
  'View Folders': "Xem Thư mục",
  'Delete Folders': "Xóa Thư mục",
  'Devices access': 'Quyền truy cập thiết bị',
  'Folders': 'Thư mục',
  'Your Passwords.': 'Mật khẩu của bạn.',
  'Impossible To Hack.': 'Không thể bị hack.',
  'To Hack.': 'Bị hack.',
  'Save credentials, find accounts quickly and keep access under your control.': 'Lưu thông tin đăng nhập, tìm tài khoản nhanh chóng và luôn kiểm soát quyền truy cập.',
  'Search accounts...': 'Tìm kiếm tài khoản...',
  'Search Google, Figma, PayPal...': 'Tìm kiếm Google, Figma, PayPal...',
  'Create': 'Tạo',
  'your account': 'tài khoản',
  'Protect': 'Bảo vệ',
  'your vault': 'kho mật khẩu',
  'Passwords history': 'Lịch sử mật khẩu',
  'Passwords': 'Lịch sử',
  'history': 'mật khẩu',
  'Emergency access': 'Quyền truy cập khẩn cấp',
  'Emergency': 'Quyền truy cập',
  'access': 'khẩn cấp',
  'Master password': 'Mật khẩu chính',
  'READ MORE': 'ĐỌC THÊM',
  'How CheckKey': 'Cách CheckKey',
  'How CheckKey protects your passwords.': 'Cách CheckKey bảo vệ mật khẩu của bạn.',
  'protects your passwords.': 'bảo vệ mật khẩu của bạn.',
  'Your passwords stay private and encrypted, so you stay in control': 'Mật khẩu của bạn luôn riêng tư và được mã hóa, để bạn luôn kiểm soát',
  'wherever you go.': 'dù ở bất cứ đâu.',
  'Encrypted on your device': 'Được mã hóa trên thiết bị',
  'Your password is encrypted before it leaves your device.': 'Mật khẩu được mã hóa trước khi rời khỏi thiết bị của bạn.',
  'Stored as encrypted data': 'Được lưu dưới dạng dữ liệu mã hóa',
  'CheckKey stores encrypted data, not readable passwords.': 'CheckKey lưu trữ dữ liệu đã mã hóa, không phải mật khẩu ở dạng có thể đọc được.',
  'Readable only when needed': 'Chỉ có thể đọc khi cần',
  'Your password is decrypted only when you need it, on your trusted device.': 'Mật khẩu chỉ được giải mã khi bạn cần, trên thiết bị đáng tin cậy của bạn.',
  'FAQ': 'CÂU HỎI THƯỜNG GẶP',
  'Common questions.': 'Câu hỏi thường gặp.',
  'Clear answers.': 'Câu trả lời rõ ràng.',
  'Everything you need to know, in plain language.': 'Mọi điều bạn cần biết, được giải thích rõ ràng.',
  'What if someone gets access to stored data?': 'Nếu ai đó truy cập được dữ liệu đã lưu thì sao?',
  'What protects your master password?': 'Điều gì bảo vệ mật khẩu chính của bạn?',
  'How do I control device access?': 'Tôi kiểm soát quyền truy cập thiết bị như thế nào?',
  'No. Your passwords remain encrypted, and only you can unlock them.': 'Không. Mật khẩu của bạn vẫn được mã hóa và chỉ bạn mới có thể mở khóa chúng.',
  'Without your key, the data stays encrypted and unreadable.': 'Nếu không có khóa của bạn, dữ liệu vẫn được mã hóa và không thể đọc được.',
  'Your master password stays with you and is not stored as readable text.': 'Mật khẩu chính chỉ thuộc về bạn và không được lưu dưới dạng văn bản có thể đọc được.',
  'You can review connected devices and remove access you no longer trust.': 'Bạn có thể xem các thiết bị đã kết nối và xóa quyền truy cập mà bạn không còn tin cậy.',
  'DESIGNED FOR DAILY USE': 'THIẾT KẾ CHO SỬ DỤNG HẰNG NGÀY',
  'Less clutter.': 'Gọn gàng hơn.',
  'More control.': 'Kiểm soát tốt hơn.',
  'Less clutter': 'Ít lộn xộn hơn',
  'More control': 'Kiểm soát nhiều hơn',
  'CheckKey keeps password management focused on the actions people actually need: save, search, protect and access.': 'CheckKey tập trung việc quản lý mật khẩu vào những thao tác thực sự cần thiết: lưu, tìm kiếm, bảo vệ và truy cập.',
  'Sign up with your email and': 'Đăng ký bằng email và',
  'complete verification.': 'hoàn tất xác minh.',
  'Set your master password': 'Thiết lập mật khẩu chính',
  'and personal security question.': 'và câu hỏi bảo mật cá nhân.',
  'Give a trusted person secure': 'Cấp cho người đáng tin cậy quyền',
  'access during an emergency.': 'truy cập an toàn trong trường hợp khẩn cấp.',
  'Landing': 'Trang chủ',
  'Open menu': 'Mở menu',
  'Close menu': 'Đóng menu',
  'Device access warning': 'Cảnh báo truy cập thiết bị',
  'If a device is revoked, you will no longer be able to log in to your account from that device.': 'Nếu một thiết bị bị thu hồi, bạn sẽ không còn khả năng đăng nhập vào tài khoản của mình từ thiết bị đó.'
};

const LANGUAGE_CONTENT = {
  en: {
    title: 'CheckKey — Your Passwords. Impossible To hack.',
    description: 'CheckKey is a simple password manager for storing, organizing and protecting your credentials.',
    searchPlaceholder: 'Search Google, Figma, PayPal...',
    securityDiagram: 'security-diagram.png',
    securityAlt: 'CheckKey security diagram showing only you know the master password, passwords are encrypted, and the front end and third-party data remain separate',
    aria: {
      brand: 'CheckKey home',
      desktopNav: 'Primary navigation',
      menu: 'Open menu',
      add: 'Add a sample credential',
      filters: 'Credential filters',
      values: 'CheckKey values',
      footerNav: 'Footer navigation',
      language: 'Language selector'
    }
  },
  vi: {
    title: 'CheckKey — Mật Khẩu Của Bạn. Không Thể Bị Hack.',
    description: 'CheckKey là trình quản lý mật khẩu đơn giản giúp lưu trữ, sắp xếp và bảo vệ thông tin đăng nhập của bạn.',
    searchPlaceholder: 'Tìm Google, Figma, PayPal...',
    securityDiagram: 'security-diagram-vi.png',
    securityAlt: 'Sơ đồ bảo mật CheckKey cho thấy chỉ bạn biết mật khẩu chính, mật khẩu được mã hóa, và giao diện web được tách biệt với dữ liệu bên thứ ba',
    aria: {
      brand: 'Trang chủ CheckKey',
      desktopNav: 'Điều hướng chính',
      menu: 'Mở menu',
      add: 'Thêm thông tin đăng nhập mẫu',
      filters: 'Bộ lọc thông tin đăng nhập',
      values: 'Giá trị của CheckKey',
      footerNav: 'Điều hướng chân trang',
      language: 'Chọn ngôn ngữ',

    }
  }
};

let currentLanguage = 'en';

// Single persisted language source for Landing + CHECK KEY app.
function getStoredLanguage() {
  try {
    const stored = localStorage.getItem('app_lang') || localStorage.getItem('checkkey-language');
    return stored === 'vi' || stored === 'en' ? stored : 'en';
  } catch (error) {
    return 'en';
  }
}

function restoreLanguageState() {
  const language = getStoredLanguage();
  currentLanguage = language;
  document.documentElement.lang = language;

  // Only synchronize state here. Do not re-render dashboard DOM during
  // navigation/reload, because the existing event handlers must stay intact.
  if (typeof window.__checkkeySyncHeaderLanguage === 'function') {
    window.__checkkeySyncHeaderLanguage(language);
  }

  document.querySelectorAll('header.checkkey-header').forEach(header => {
    if (typeof syncRecoveryHeaderLanguage === 'function') {
      syncRecoveryHeaderLanguage(header);
    }
  });

  return language;
}

function translateBodyText(language) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const parent = node.parentElement;
    if (
      !parent ||
      parent.closest('script, style') ||
      parent.closest('#securityReadMoreButton') ||
      parent.closest('#landing-shell header')
    ) return;

    if (typeof node.__checkKeyEnglish !== 'string') {
      node.__checkKeyEnglish = node.nodeValue;
    }

    const original = node.__checkKeyEnglish;
    if (language === 'en') {
      node.nodeValue = original;
      return;
    }

    const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
    const core = match ? match[2] : original;
    const translated = VI_TEXT[core.trim()];
    if (!translated) {
      node.nodeValue = original;
      return;
    }
    node.nodeValue = `${match ? match[1] : ''}${translated}${match ? match[3] : ''}`;
  });
}

function updateSecurityReadMoreLabel() {
  if (!securityReadMoreButton) return;
  const label = securityReadMoreButton.querySelector('span');
  if (!label) return;
  const isOpen = securityReadMoreButton.getAttribute('aria-expanded') === 'true';
  if (currentLanguage === 'vi') {
    label.textContent = isOpen ? 'Thu gọn' : 'Xem thêm về bảo mật';
  } else {
    label.textContent = isOpen ? 'Show less' : 'Read more about security';
  }
}

function updateLanguageAttributes(language) {
  const content = LANGUAGE_CONTENT[language];
  document.documentElement.lang = language;
  document.title = content.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', content.description);

  if (vaultSearch) vaultSearch.setAttribute('placeholder', content.searchPlaceholder);

  const diagram = document.querySelector('.security-diagram img');
  if (diagram) {
    diagram.setAttribute('src', content.securityDiagram);
    diagram.setAttribute('alt', content.securityAlt);
  }

  const ariaTargets = [
    ['.brand', 'brand'],
    ['.desktop-nav', 'desktopNav'],
    ['#menuButton', 'menu'],
    ['#addCredential', 'add'],
    ['.category-tabs', 'filters'],
    ['.about-values', 'values'],
    ['footer nav', 'footerNav']
  ];

  ariaTargets.forEach(([selector, key]) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute('aria-label', content.aria[key]);
  });

  document.querySelectorAll('.language-switcher').forEach(switcher => {
    switcher.setAttribute('aria-label', content.aria.language);
  });
}

function updateLandingHeaderLanguage(language) {
  const landing = document.getElementById('landing-shell');
  if (!landing) return;

  const header = landing.querySelector('header');
  if (!header) return;

  // Header is intentionally excluded from translateBodyText().
  // Update only the visible navigation labels here so EN/VI cannot mix.
  const translations = language === 'vi'
    ? {
        features: 'Tính năng',
        security: 'Bảo mật',
        howItWorks: 'Cách hoạt động',
        about: 'Giới thiệu',
        login: 'Đăng nhập',
        signup: 'Đăng ký'
      }
    : {
        features: 'Features',
        security: 'Security',
        howItWorks: 'How it works',
        about: 'About',
        login: 'Log in',
        signup: 'Sign up'
      };

  const setText = (selector, text) => {
    header.querySelectorAll(selector).forEach(element => {
      // Preserve the arrow inside the sign-up button.
      if (selector.includes('button-primary') || element.matches('.button-primary')) {
        const arrow = element.querySelector('span');
        if (arrow) {
          element.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) node.nodeValue = '';
          });
          const textNode = document.createTextNode(`${text} `);
          element.insertBefore(textNode, arrow);
          return;
        }
      }
      element.textContent = text;
    });
  };

  // Desktop + mobile navigation.
  // Header must stay title case in EN: "How it works".
  setText('.desktop-nav a[href="#features"], #mobileMenu a[href="#features"]', translations.features);
  setText('.desktop-nav a[href="#security"], #mobileMenu a[href="#security"]', translations.security);
  setText('.desktop-nav a[href="#steps"], #mobileMenu a[href="#steps"]', translations.howItWorks);
  setText('.desktop-nav a[href="#about"], #mobileMenu a[href="#about"]', translations.about);

  // Lower landing-page section is intentionally uppercase in EN.
  const stepsEyebrow = landing.querySelector('.steps .eyebrow');
  if (stepsEyebrow) {
    stepsEyebrow.textContent = language === 'vi' ? 'CÁCH HOẠT ĐỘNG' : 'HOW IT WORKS';
  }

  // Desktop header actions.
  setText('.header-actions .login-link', translations.login);
  setText('.header-actions .button-primary', translations.signup);

  // Mobile auth links.
  setText('#mobileMenu .login-link', translations.login);
  setText('#mobileMenu .button-primary', translations.signup);
}

function setLanguage(language, persist = true) {
  if (!LANGUAGE_CONTENT[language]) language = 'en';
  currentLanguage = language;
  translateBodyText(language);
  updateLandingHeaderLanguage(language);
  updateLanguageAttributes(language);
  updateSecurityReadMoreLabel();

  document.querySelectorAll('.lang-button').forEach(button => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  if (typeof window.__checkkeySyncHeaderLanguage === 'function') {
    window.__checkkeySyncHeaderLanguage(language);
  }

  if (persist) {
    try {
      localStorage.setItem('checkkey-language', language);
      localStorage.setItem('app_lang', language);
    } catch (error) { /* storage may be unavailable */ }
  }
}

document.querySelectorAll('.lang-button').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

const savedLanguage = getStoredLanguage();
setLanguage(savedLanguage, false);


import "./analytics/analytics.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  onAuthStateChanged,
  reload,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signInWithCustomToken
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc,
  getDoc,
  updateDoc,
  deleteField,
  serverTimestamp,
  collection,
  deleteDoc,
  onSnapshot,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ==========================================
// ĐIỀU CHỈNH GIAO DIỆN (UI TWEAKS DYNAMIC)
// ==========================================
const customUIFixes = document.createElement('style');
customUIFixes.innerHTML = `
  /* Kéo đoạn note sát lên ô nhập mật khẩu */
  span[data-i18n="Do not enter a real password. The prototype never persists this value."] {
      margin-top: 4px !important;
      display: block;
      line-height: 1.3;
  }
`;
document.head.appendChild(customUIFixes);

// ==========================================
// CHECK KEY HEADER — LANDING-MATCHED UI
// Same header treatment on Login, Create Account, Recovery,
// Vault screens, Dashboard and Analytics.
// Desktop: one single horizontal row.
// Mobile: compact hamburger menu.
// Existing Firebase/Auth/dashboard logic is preserved.
// ==========================================

function injectCheckKeyHeaderStyles() {
  if (document.getElementById('checkkey-header-styles')) return;

  const style = document.createElement('style');
  style.id = 'checkkey-header-styles';
  style.textContent = `
    /* =====================================================
       FIXED APP HEADERS — ALWAYS VISIBLE WHILE SCROLLING
       Dashboard + Login + Create Account
       ===================================================== */
    #checkkey-app header.checkkey-dashboard-header,
    #checkkey-app header.checkkey-auth-header {
      position: fixed !important;
      top: 18px !important;
      left: 24px !important;
      right: 24px !important;
      width: auto !important;
      margin: 0 !important;
      z-index: 10000 !important;
    }

    /* Keep page content from starting underneath the fixed header. */
    #checkkey-app #screen-dashboard,
    #checkkey-app #screen-login,
    #checkkey-app #screen-create-account {
      padding-top: 128px !important;
      box-sizing: border-box !important;
    }

    /* =====================================================
       CHECK KEY APP HEADER
       IMPORTANT: everything is forced into ONE horizontal row.
       ===================================================== */
    /* =====================================================
       CHECK KEY HEADER — SYNCHRONIZED WITH LANDING
       Match the Landing header's overall shell, spacing,
       typography and visual weight.
       IMPORTANT: Home button + EN/VI switch keep their
       existing shapes/styles.
       ===================================================== */
    #checkkey-app header.checkkey-header {
      position: relative;
      z-index: 100;
      box-sizing: border-box;
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-wrap: nowrap !important;

      /* Landing-like outer geometry */
      width: calc(100% - 48px) !important;
      max-width: none !important;
      min-height: 92px !important;
      height: 92px !important;
      margin: 18px 24px !important;
      padding: 0 36px !important;

      gap: 24px !important;
      border: 0 !important;
      border-radius: 999px !important;
      background: rgba(17, 17, 17, 0.96) !important;
      box-shadow: 0 14px 40px rgba(0, 0, 0, 0.16) !important;
      backdrop-filter: blur(18px) !important;
      -webkit-backdrop-filter: blur(18px) !important;

      font-family: Inter, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }

    #checkkey-app header.checkkey-header .checkkey-header-brand {
      display: flex !important;
      flex-direction: row !important;
      align-items: baseline !important;
      flex-wrap: nowrap !important;
      gap: 16px !important;
      min-width: 0;
      flex: 1 1 auto;
      white-space: nowrap;
    }

    #checkkey-app header.checkkey-header .checkkey-header-brand > * {
      margin: 0 !important;
      white-space: nowrap !important;
    }

    #checkkey-app header.checkkey-header .checkkey-brand-title,
    #checkkey-app header.checkkey-header h1.checkkey-brand-title,
    #checkkey-app header.checkkey-header h2.checkkey-brand-title,
    #checkkey-app header.checkkey-header h3.checkkey-brand-title {
      color: #ffffff !important;
      opacity: 1 !important;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      font-weight: 800 !important;
      font-size: 22px !important;
      line-height: 1.1 !important;
      letter-spacing: -0.02em !important;
      white-space: nowrap !important;
    }

    #checkkey-app header.checkkey-header .checkkey-brand-subtitle {
      color: rgba(255, 255, 255, 0.58) !important;
      opacity: 1 !important;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      font-weight: 400 !important;
      font-size: 23px !important;
      line-height: 1.1 !important;
      letter-spacing: -0.015em !important;
      white-space: nowrap !important;
    }

    /* Right side: Landing + EN/VI are ALWAYS on the same row. */
    #checkkey-app header.checkkey-header .checkkey-header-actions {
      display: flex !important;
      flex: 0 0 auto !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: flex-end !important;
      flex-wrap: nowrap !important;
      gap: 12px !important;
      min-width: max-content !important;
      white-space: nowrap !important;
    }

    /* Home button — now matches the Landing primary CTA language. */
    #checkkey-app .checkkey-landing-link {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      align-items: center !important;
      justify-content: center !important;
      min-height: 50px !important;
      height: 50px !important;
      padding: 0 28px !important;
      border: 0 !important;
      outline: 0 !important;
      background: #ffffff !important;
      color: #111111 !important;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system,
        BlinkMacSystemFont, "Segoe UI", sans-serif !important;
      font-size: 15px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      text-decoration: none !important;
      cursor: pointer !important;
      border-radius: 12px !important;
      white-space: nowrap !important;
      box-shadow: none !important;
    }

    #checkkey-app .checkkey-landing-link:hover {
      background: #f5f5f5 !important;
      color: #111111 !important;
    }

    /* EN / VI pill — replaces the old square/select control visually. */
    #checkkey-app .checkkey-lang-toggle {
      display: inline-flex !important;
      flex: 0 0 auto !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: center !important;
      flex-wrap: nowrap !important;
      gap: 2px !important;
      min-width: 106px !important;
      min-height: 44px !important;
      padding: 3px !important;
      border: 1px solid #e3dfea !important;
      border-radius: 999px !important;
      background: #f5f2fa !important;
      box-sizing: border-box !important;
      white-space: nowrap !important;
    }

    #checkkey-app .checkkey-lang-button {
      display: inline-flex !important;
      flex: 0 0 48px !important;
      width: 48px !important;
      min-width: 48px !important;
      height: 36px !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 0 !important;
      outline: 0 !important;
      border-radius: 999px !important;
      background: transparent !important;
      color: #8a8a8a !important;
      font-family: inherit !important;
      font-size: 14px !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      cursor: pointer !important;
    }

    #checkkey-app .checkkey-lang-button.active {
      background: #fff !important;
      color: #111111 !important;
      box-shadow: 0 2px 7px rgba(38, 29, 66, 0.10) !important;
    }

    /* Hide ALL legacy language UI so the old square EN control cannot survive. */
    #checkkey-app .legacy-checkkey-language,
    #checkkey-app #app-language-switcher,
    #checkkey-app select[name="language"],
    #checkkey-app .language-switcher:not(.checkkey-lang-toggle),
    #checkkey-app .lang-switcher:not(.checkkey-lang-toggle) {
      display: none !important;
    }

    /* Mobile */
    #checkkey-app .checkkey-menu-button,
    #checkkey-app .checkkey-mobile-menu {
      display: none;
    }

    @media (max-width: 980px) {
      /* Mobile/tablet header matches the Landing header:
         full viewport width and flush against the top. */
      #checkkey-app header.checkkey-header {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        z-index: 10000 !important;
        box-sizing: border-box !important;

        width: 100% !important;
        max-width: none !important;
        min-height: 68px !important;
        height: 68px !important;

        margin: 0 !important;
        padding: 0 18px !important;
        gap: 12px !important;

        border-radius: 0 !important;
        background: rgba(17, 17, 17, 0.96) !important;
      }

      #checkkey-app header.checkkey-header .checkkey-header-brand {
        gap: 0 !important;
        flex: 1 1 auto !important;
      }

      #checkkey-app header.checkkey-header .checkkey-brand-title {
        font-size: 20px !important;
      }

      #checkkey-app header.checkkey-header .checkkey-brand-subtitle {
        display: none !important;
      }

      #checkkey-app header.checkkey-header .checkkey-header-actions {
        display: none !important;
      }

      #checkkey-app .checkkey-menu-button {
        display: inline-flex !important;
        flex: 0 0 auto !important;
        width: 42px !important;
        height: 42px !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 !important;
        border: 1px solid #e3dfea !important;
        border-radius: 50% !important;
        background: #fff !important;
        color: #171827 !important;
        cursor: pointer !important;
      }

      #checkkey-app .checkkey-menu-button span,
      #checkkey-app .checkkey-menu-button span::before,
      #checkkey-app .checkkey-menu-button span::after {
        display: block;
        width: 18px;
        height: 2px;
        border-radius: 2px;
        background: currentColor;
        content: "";
      }

      #checkkey-app .checkkey-menu-button span {
        position: relative;
      }

      #checkkey-app .checkkey-menu-button span::before {
        position: absolute;
        top: -6px;
      }

      #checkkey-app .checkkey-menu-button span::after {
        position: absolute;
        top: 6px;
      }

      /* Hamburger menu sits directly below the fixed header. */
      #checkkey-app .checkkey-mobile-menu {
        position: fixed !important;
        top: 68px !important;
        left: 0 !important;
        right: 0 !important;
        width: 100% !important;
        max-width: none !important;
        z-index: 9999 !important;

        display: none;
        flex-direction: column;
        gap: 8px;
        max-height: min(70vh, 560px);
        overflow-y: auto;
        padding: 10px 18px 18px;
        border: 1px solid rgba(94, 76, 140, 0.12);
        border-radius: 0 0 20px 20px;
        background: #fff;
        box-shadow: 0 14px 32px rgba(38, 29, 66, 0.12);
        box-sizing: border-box;
      }

      #checkkey-app .checkkey-mobile-menu.open {
        display: flex !important;
      }

      /* Fixed header offset on mobile. */
      #checkkey-app #screen-dashboard,
      #checkkey-app #screen-login,
      #checkkey-app #screen-create-account {
        padding-top: 68px !important;
        box-sizing: border-box !important;
      }

      /* Dashboard sections are rendered inside the hamburger menu on mobile. */
      #checkkey-app #screen-dashboard .sidebar {
        display: none !important;
      }

      #checkkey-app .checkkey-mobile-nav {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 4px 0;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;
      }

      #checkkey-app .checkkey-mobile-nav-item {
        display: flex !important;
        align-items: center !important;
        width: 100% !important;
        min-height: 44px !important;
        padding: 12px 14px !important;
        border-radius: 10px !important;
        color: #757585 !important;
        background: transparent !important;
        font-size: 14px !important;
        font-weight: 500 !important;
        text-decoration: none !important;
        box-sizing: border-box !important;
        cursor: pointer !important;
      }

      #checkkey-app .checkkey-mobile-nav-item.active {
        background: #eeeeee !important;
        color: #1c1c28 !important;
        font-weight: 700 !important;
      }

      #checkkey-app .checkkey-mobile-logout {
        display: flex !important;
        align-items: center !important;
        width: 100% !important;
        min-height: 44px !important;
        padding: 12px 14px !important;
        border: 0 !important;
        border-radius: 10px !important;
        background: transparent !important;
        color: #1c1c28 !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        text-align: left !important;
        cursor: pointer !important;
      }

      #checkkey-app .checkkey-mobile-logout:hover {
        background: #fdf5f5 !important;
        color: #d9534f !important;
      }

      #checkkey-app .checkkey-mobile-menu .checkkey-landing-link {
        width: 100% !important;
        justify-content: flex-start !important;
        padding: 0 14px !important;
        min-height: 44px !important;
      }

      #checkkey-app .checkkey-mobile-menu .checkkey-lang-toggle {
        width: 100% !important;
        min-width: 0 !important;
      }

      #checkkey-app .checkkey-mobile-menu .checkkey-lang-button {
        flex: 1 1 50% !important;
        width: auto !important;
      }
    }

    @media (max-width: 650px) {
      #checkkey-app #screen-dashboard,
      #checkkey-app #screen-login,
      #checkkey-app #screen-create-account {
        padding-top: 64px !important;
      }

      #checkkey-app header.checkkey-header {
        height: 64px !important;
        min-height: 64px !important;
        padding: 0 14px !important;
      }

      #checkkey-app .checkkey-mobile-menu {
        top: 64px !important;
        padding-left: 14px !important;
        padding-right: 14px !important;
      }
    }

    @media (max-width: 430px) {
      #checkkey-app header.checkkey-header {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
    }
  `;

  document.head.appendChild(style);
}

function getCheckKeyHeaders() {
  const app = getCheckKeyApp();
  if (!app) return [];
  return Array.from(app.querySelectorAll('header'));
}

function setupOneCheckKeyHeader(header) {
  if (!header || header.dataset.checkkeyHeaderReady === 'true') return;

  header.classList.add('checkkey-header');

  // Keep the main app header visible while the user scrolls.
  // Dashboard, Login and Create Account all use a fixed header.
  const parentScreen = header.closest('.screen');
  const isDashboardHeader = !!header.closest('#screen-dashboard');
  const isAuthHeader = !!parentScreen && (
    parentScreen.id === 'screen-login' ||
    parentScreen.id === 'screen-create-account'
  );

  header.classList.toggle('checkkey-dashboard-header', isDashboardHeader);
  header.classList.toggle('checkkey-auth-header', isAuthHeader);

  // Find the existing brand precisely.
  // The CHECK KEY heading contains the Password Manager <span>, so do NOT
  // classify the whole heading as both title and subtitle.
  const headingCandidates = Array.from(
    header.querySelectorAll('h1, h2, h3')
  );

  const brandTitle =
    headingCandidates.find(el => {
      const directText = Array.from(el.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE)
        .map(node => node.textContent || '')
        .join(' ')
        .trim();

      return /^check\s*key$/i.test(directText);
    }) ||
    headingCandidates.find(el => {
      const subtitle = el.querySelector('.subtitle');
      return subtitle && /check\s*key/i.test(
        Array.from(el.childNodes)
          .filter(node => node.nodeType === Node.TEXT_NODE)
          .map(node => node.textContent || '')
          .join(' ')
      );
    });

  const brandSubtitle =
    brandTitle?.querySelector('.subtitle') ||
    Array.from(header.querySelectorAll('.subtitle')).find(el =>
      /password\s*manager/i.test(el.textContent || '')
    );

  if (brandTitle) {
    brandTitle.classList.add('checkkey-brand-title');
    brandTitle.classList.remove('checkkey-brand-subtitle');
  }

  if (brandSubtitle) {
    brandSubtitle.classList.add('checkkey-brand-subtitle');
    brandSubtitle.classList.remove('checkkey-brand-title');
  }

  let brand = header.querySelector(':scope > .checkkey-header-brand');
  if (!brand) {
    brand = document.createElement('div');
    brand.className = 'checkkey-header-brand';
    header.insertBefore(brand, header.firstChild);
  }

  if (brandTitle && brandTitle.parentElement !== brand) brand.appendChild(brandTitle);
  if (brandSubtitle && brandSubtitle.parentElement !== brand) brand.appendChild(brandSubtitle);

  let actions = header.querySelector(':scope > .checkkey-header-actions');
  if (!actions) {
    actions = document.createElement('div');
    actions.className = 'checkkey-header-actions';
    header.appendChild(actions);
  }

  // Home button. Remove any legacy/duplicate Landing buttons first.
  header.querySelectorAll('.btn-back-to-landing').forEach(button => button.remove());

  const landingButton = document.createElement('button');
  landingButton.type = 'button';
  landingButton.className = 'checkkey-landing-link btn-back-to-landing';
  landingButton.textContent = 'Home';
  actions.insertBefore(landingButton, actions.firstChild);

  // New EN / VI pill. The old control is hidden below, never duplicated.
  let langToggle = actions.querySelector('.checkkey-lang-toggle');
  if (!langToggle) {
    langToggle = document.createElement('div');
    langToggle.className = 'checkkey-lang-toggle';
    langToggle.setAttribute('role', 'group');
    langToggle.setAttribute('aria-label', 'Language');
    langToggle.innerHTML = `
      <button type="button" class="checkkey-lang-button" data-checkkey-lang="en">EN</button>
      <button type="button" class="checkkey-lang-button" data-checkkey-lang="vi">VI</button>
    `;
    actions.appendChild(langToggle);
  }

  // Hide legacy language controls inside THIS header, including the old square EN button.
  header.querySelectorAll(
    '#app-language-switcher, select[name="language"], .language-switcher:not(.checkkey-lang-toggle), .lang-switcher:not(.checkkey-lang-toggle), [data-language-switcher]'
  ).forEach(control => {
    if (control !== langToggle && !control.contains(langToggle)) {
      control.classList.add('legacy-checkkey-language');
    }
  });

  langToggle.querySelectorAll('[data-checkkey-lang]').forEach(button => {
    if (button.dataset.checkkeyLangBound === 'true') return;
    button.dataset.checkkeyLangBound = 'true';
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const lang = button.dataset.checkkeyLang;
      if (lang && typeof window.switchLanguage === 'function') {
        window.switchLanguage(lang);
      }
    });
  });

  // Mobile hamburger.
  let menuButton = header.querySelector(':scope > .checkkey-menu-button');
  let mobileMenu = header.querySelector(':scope > .checkkey-mobile-menu');

  if (!menuButton) {
    menuButton = document.createElement('button');
    menuButton.type = 'button';
    menuButton.className = 'checkkey-menu-button';
    menuButton.setAttribute('aria-label', 'Open menu');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.innerHTML = '<span aria-hidden="true"></span>';
    header.appendChild(menuButton);
  }

  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.className = 'checkkey-mobile-menu';

    const mobileLanding = document.createElement('button');
    mobileLanding.type = 'button';
    mobileLanding.className = 'checkkey-landing-link btn-back-to-landing';
    mobileLanding.textContent = 'Home';
    mobileMenu.appendChild(mobileLanding);

    const mobileNav = document.createElement('div');
    mobileNav.className = 'checkkey-mobile-nav';
    mobileNav.setAttribute('aria-label', 'Dashboard navigation');
    mobileMenu.appendChild(mobileNav);

    const mobileLogout = document.createElement('button');
    mobileLogout.type = 'button';
    mobileLogout.className = 'checkkey-mobile-logout';
    mobileLogout.textContent = 'Log Out';

    // Logout belongs to the Dashboard menu only.
    const isDashboardHeader = !!header.closest('#screen-dashboard');
    if (isDashboardHeader) {
      mobileMenu.appendChild(mobileLogout);
    }

    const mobileLang = langToggle.cloneNode(true);
    mobileLang.classList.add('checkkey-mobile-lang-toggle');
    mobileLang.querySelectorAll('[data-checkkey-lang]').forEach(button => {
      button.dataset.checkkeyMobileLangBound = 'true';
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        const lang = button.dataset.checkkeyLang;
        if (lang && typeof window.switchLanguage === 'function') {
          window.switchLanguage(lang);
        }
      });
    });
    mobileMenu.appendChild(mobileLang);
    header.appendChild(mobileMenu);

    menuButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const dashboardScreen = header.closest('#screen-dashboard');
      const sidebarNav = dashboardScreen?.querySelector('.sidebar nav ul');
      mobileNav.innerHTML = '';

      if (sidebarNav) {
        sidebarNav.querySelectorAll('.nav-item').forEach(original => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = `checkkey-mobile-nav-item${original.classList.contains('active') ? ' active' : ''}`;
          item.textContent = original.textContent.trim();
          item.dataset.targetNavId = original.id || '';
          mobileNav.appendChild(item);
        });
        mobileNav.style.display = '';
        if (mobileLogout) mobileLogout.style.display = '';
      } else {
        mobileNav.style.display = 'none';
        if (mobileLogout) mobileLogout.style.display = 'none';
      }

      const open = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    mobileMenu.addEventListener('click', event => {
      const landing = event.target.closest('.btn-back-to-landing');
      if (landing) {
        mobileMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        return;
      }

      const navItem = event.target.closest('.checkkey-mobile-nav-item');
      if (navItem) {
        const targetId = navItem.dataset.targetNavId;
        const original = targetId ? document.getElementById(targetId) : null;
        if (original) original.click();
        mobileMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
        return;
      }

      const logout = event.target.closest('.checkkey-mobile-logout');
      if (logout && header.closest('#screen-dashboard')) {
        const originalLogout = document.getElementById('btn-logout');
        if (originalLogout) originalLogout.click();
        mobileMenu.classList.remove('open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const updateHeaderLanguage = () => {
    const lang = getStoredLanguage();
    const homeLabel = lang === 'vi' ? 'Trang chủ' : 'Home';
    const landingButton = header.querySelector(':scope > .checkkey-header-actions .btn-back-to-landing');
    const mobileLanding = header.querySelector(':scope > .checkkey-mobile-menu .btn-back-to-landing');

    if (landingButton) landingButton.textContent = homeLabel;
    if (mobileLanding) mobileLanding.textContent = homeLabel;

    header.querySelectorAll('.checkkey-lang-toggle [data-checkkey-lang]').forEach(button => {
      const active = button.dataset.checkkeyLang === lang;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  updateHeaderLanguage();
  header.dataset.checkkeyHeaderReady = 'true';
}

function ensureRecoveryPinHeaders() {
  // Recovery screens do not have the application header in their original
  // HTML, so create the COMPLETE header here in JavaScript.
  //
  // Important: do not depend on #checkkey-app. The recovery screens are
  // rendered independently and must still receive the header.
  const recoveryScreens = [
    'screen-recovery-setup',
    'screen-recovery-set-password',
    'screen-recovery-success'
  ];

  recoveryScreens.forEach(screenId => {
    const screen = document.getElementById(screenId);
    if (!screen) return;

    let header = screen.querySelector(':scope > header.checkkey-header');

    if (!header) {
      const authWrapper = screen.querySelector(':scope > .auth-wrapper');
      if (!authWrapper) return;

      header = document.createElement('header');
      header.className = 'app-header checkkey-header';
      header.setAttribute('role', 'banner');

      header.innerHTML = `
        <div class="checkkey-header-brand">
          <h2 class="checkkey-brand-title">
            CHECK KEY <span class="checkkey-brand-subtitle">Password Manager</span>
          </h2>
        </div>

        <div class="checkkey-header-actions">
          <button
            type="button"
            class="checkkey-landing-link btn-back-to-landing"
          >Home</button>

          <div
            class="checkkey-lang-toggle"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              class="checkkey-lang-button active"
              data-checkkey-lang="en"
              aria-pressed="true"
            >EN</button>
            <button
              type="button"
              class="checkkey-lang-button"
              data-checkkey-lang="vi"
              aria-pressed="false"
            >VI</button>
          </div>
        </div>

        <button
          type="button"
          class="checkkey-menu-button"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
        </button>

        <div class="checkkey-mobile-menu">
          <button
            type="button"
            class="checkkey-landing-link btn-back-to-landing"
          >Home</button>

          <div
            class="checkkey-mobile-nav"
            aria-label="Navigation"
            style="display:none"
          ></div>

          <div class="checkkey-lang-toggle checkkey-mobile-lang-toggle"
               role="group"
               aria-label="Language">
            <button
              type="button"
              class="checkkey-lang-button active"
              data-checkkey-lang="en"
              aria-pressed="true"
            >EN</button>
            <button
              type="button"
              class="checkkey-lang-button"
              data-checkkey-lang="vi"
              aria-pressed="false"
            >VI</button>
          </div>
        </div>
      `;

      // Put the header BEFORE the auth wrapper so it is actually visible
      // at the top of the recovery screen.
      screen.insertBefore(header, authWrapper);

      // Bind header behaviour immediately.
      bindRecoveryHeaderActions(header);
    }

    // Re-run language synchronization for an existing/new header.
    syncRecoveryHeaderLanguage(header);
  });
}

function bindRecoveryHeaderActions(header) {
  if (!header || header.dataset.recoveryHeaderBound === 'true') return;

  const goHome = event => {
    event.preventDefault();
    event.stopPropagation();

    if (typeof showLandingPage === 'function') {
      showLandingPage();
    } else {
      window.location.hash = '';
    }
  };

  header.querySelectorAll('.btn-back-to-landing').forEach(button => {
    button.addEventListener('click', goHome);
  });

  header.querySelectorAll('[data-checkkey-lang]').forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const lang = button.dataset.checkkeyLang;
      if (lang && typeof window.switchLanguage === 'function') {
        window.switchLanguage(lang);
      }

      syncRecoveryHeaderLanguage(header);
    });
  });

  const menuButton = header.querySelector('.checkkey-menu-button');
  const mobileMenu = header.querySelector('.checkkey-mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = mobileMenu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  header.dataset.recoveryHeaderBound = 'true';
}

function syncRecoveryHeaderLanguage(header) {
  if (!header) return;

  const lang = getStoredLanguage();
  const homeLabel = lang === 'vi' ? 'Trang chủ' : 'Home';

  header.querySelectorAll('.btn-back-to-landing').forEach(button => {
    button.textContent = homeLabel;
  });

  header.querySelectorAll('[data-checkkey-lang]').forEach(button => {
    const active = button.dataset.checkkeyLang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  const title = header.querySelector('.checkkey-brand-title');
  const subtitle = header.querySelector('.checkkey-brand-subtitle');

  if (title) {
    title.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        node.textContent = lang === 'vi' ? 'CHECK KEY ' : 'CHECK KEY ';
      }
    });
  }

  if (subtitle) {
    subtitle.textContent = lang === 'vi' ? 'Trình quản lý mật khẩu' : 'Password Manager';
  }
}
function ensureCheckKeyHeadersForAllScreens() {
  const app = getCheckKeyApp();
  if (!app) return;

  const screens = Array.from(app.querySelectorAll(':scope > .screen'));

  screens.forEach(screen => {
    // Startup is intentionally a header-less loading panel.
    if (screen.id === 'screen-startup') return;

    let header = screen.querySelector(':scope > header');

    if (!header) {
      header = document.createElement('header');
      header.className = 'app-header checkkey-header';
      header.setAttribute('role', 'banner');

      header.innerHTML = `
        <div class="checkkey-header-brand">
          <h2 class="checkkey-brand-title">
            CHECK KEY <span class="checkkey-brand-subtitle">Password Manager</span>
          </h2>
        </div>

        <div class="checkkey-header-actions">
          <button
            type="button"
            class="checkkey-landing-link btn-back-to-landing"
          >Home</button>

          <div
            class="checkkey-lang-toggle"
            role="group"
            aria-label="Language"
          >
            <button
              type="button"
              class="checkkey-lang-button active"
              data-checkkey-lang="en"
              aria-pressed="true"
            >EN</button>
            <button
              type="button"
              class="checkkey-lang-button"
              data-checkkey-lang="vi"
              aria-pressed="false"
            >VI</button>
          </div>
        </div>

        <button
          type="button"
          class="checkkey-menu-button"
          aria-label="Open menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
        </button>

        <div class="checkkey-mobile-menu">
          <button
            type="button"
            class="checkkey-landing-link btn-back-to-landing"
          >Home</button>

          <div
            class="checkkey-mobile-nav"
            aria-label="Navigation"
            style="display:none"
          ></div>

          <div class="checkkey-lang-toggle checkkey-mobile-lang-toggle"
               role="group"
               aria-label="Language">
            <button
              type="button"
              class="checkkey-lang-button active"
              data-checkkey-lang="en"
              aria-pressed="true"
            >EN</button>
            <button
              type="button"
              class="checkkey-lang-button"
              data-checkkey-lang="vi"
              aria-pressed="false"
            >VI</button>
          </div>
        </div>
      `;

      const reference =
        screen.querySelector(':scope > .auth-wrapper') ||
        screen.querySelector(':scope > .dashboard-layout') ||
        screen.firstElementChild;

      if (reference) {
        screen.insertBefore(header, reference);
      } else {
        screen.appendChild(header);
      }
    }

    setupOneCheckKeyHeader(header);
  });
}

function setupCheckKeyHeader() {
  injectCheckKeyHeaderStyles();
  ensureRecoveryPinHeaders();
  ensureCheckKeyHeadersForAllScreens();
  const headers = getCheckKeyHeaders();
  headers.forEach(setupOneCheckKeyHeader);

  // The DOM can reveal screen-specific headers after navigation.
  if (!window.__checkkeyHeaderObserver) {
    window.__checkkeyHeaderObserver = new MutationObserver(() => {
      getCheckKeyHeaders().forEach(setupOneCheckKeyHeader);
    });
    const app = getCheckKeyApp();
    if (app) window.__checkkeyHeaderObserver.observe(app, { childList: true, subtree: true });
  }

  // Keep every header's EN/VI state synchronized.
  if (!window.__checkkeyHeaderLanguageSyncBound) {
    window.__checkkeyHeaderLanguageSyncBound = true;
    const sync = lang => {
      document.querySelectorAll('.checkkey-lang-toggle [data-checkkey-lang]').forEach(button => {
        const active = button.dataset.checkkeyLang === lang;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    };
    window.__checkkeySyncHeaderLanguage = sync;
  }
}

// ==========================================
// LANDING PAGE INTEGRATION
// CHECK KEY itself is wrapped by #checkkey-app.
// This bridge connects Landing -> CHECK KEY auth screens
// and CHECK KEY -> Landing without changing Firebase/Auth logic.
// ==========================================

function getLandingShell() {
  return document.getElementById('landing-shell');
}

function getCheckKeyApp() {
  return document.getElementById('checkkey-app');
}

function setLandingVisibility(isVisible) {
  const shell = getLandingShell();
  const app = getCheckKeyApp();
  const appLanguageSwitcher = document.getElementById('app-language-switcher');

  // IMPORTANT:
  // Before hiding one application layer with aria-hidden, move focus out of
  // that layer. This prevents the accessibility warning where a focused
  // Landing button remains inside #landing-shell[aria-hidden="true"].
  const activeElement = document.activeElement;
  if (activeElement instanceof HTMLElement) {
    const insideLanding = !!shell?.contains(activeElement);
    const insideApp = !!app?.contains(activeElement);

    if ((isVisible && insideApp) || (!isVisible && insideLanding)) {
      activeElement.blur();
    }
  }

  if (shell) {
    shell.style.display = isVisible ? '' : 'none';
    shell.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
    shell.inert = !isVisible;
  }

  if (app) {
    app.style.display = isVisible ? 'none' : '';
    app.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
    app.inert = isVisible;
  }

  if (appLanguageSwitcher) {
    appLanguageSwitcher.style.display = isVisible ? 'none' : '';
  }

  document.body.classList.toggle('landing-active', isVisible);

  // LANDING ONLY: keep the landing page in normal document flow.
  // This prevents any fixed/sticky/locked landing state from being
  // preserved when switching back from the app.
  if (shell) {
    if (isVisible) {
      shell.style.setProperty('position', 'relative', 'important');
      shell.style.setProperty('top', 'auto', 'important');
      shell.style.setProperty('left', 'auto', 'important');
      shell.style.setProperty('right', 'auto', 'important');
      shell.style.setProperty('bottom', 'auto', 'important');
      shell.style.setProperty('height', 'auto', 'important');
      shell.style.setProperty('min-height', '100vh', 'important');
      shell.style.setProperty('overflow', 'visible', 'important');
    } else {
      // Remove only the inline overrides added for the landing page.
      shell.style.removeProperty('position');
      shell.style.removeProperty('top');
      shell.style.removeProperty('left');
      shell.style.removeProperty('right');
      shell.style.removeProperty('bottom');
      shell.style.removeProperty('height');
      shell.style.removeProperty('min-height');
      shell.style.removeProperty('overflow');
    }
  }

  if (isVisible) {
    // LANDING ONLY: explicitly restore normal document scrolling.
    // These properties are scoped to the landing state so the app/dashboard
    // layout and its existing scroll behaviour are not changed.
    document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
    document.documentElement.style.setProperty('height', 'auto', 'important');
    document.documentElement.style.setProperty('position', 'static', 'important');
    document.documentElement.style.setProperty('top', 'auto', 'important');
    document.body.style.setProperty('overflow-y', 'auto', 'important');
    document.body.style.setProperty('height', 'auto', 'important');
    document.body.style.setProperty('position', 'static', 'important');
    document.body.style.setProperty('top', 'auto', 'important');
    document.body.style.setProperty('touch-action', 'auto', 'important');
    document.documentElement.style.setProperty('touch-action', 'auto', 'important');

    // LANDING HEADER: positioning is controlled by the Landing CSS.
    // Do not override the fixed header position here.
  }
}

function showLandingPage() {
  setLandingVisibility(true);

  /*
   * Re-apply the persisted language when returning from CHECK KEY to Landing.
   * The Dashboard can change language without rebuilding the Landing DOM, so
   * the Landing text must be refreshed explicitly on this navigation path.
   * This uses the same single persisted language source and does not alter
   * authentication or button handlers.
   */
  const landingLanguage = getStoredLanguage();
  if (typeof setLanguage === 'function') {
    setLanguage(landingLanguage, false);
  } else {
    currentLanguage = landingLanguage;
    document.documentElement.lang = landingLanguage;
  }

  const app = getCheckKeyApp();
  if (app) {
    app.querySelectorAll('.screen').forEach(screen => {
      screen.classList.remove('active');
    });
  }
}

function bindLandingNavigation() {
  if (window.__checkkeyUnifiedLandingNavigationBound) return;
  window.__checkkeyUnifiedLandingNavigationBound = true;

  /*
   * LANDING HEADER — matched to the current CheckKey HTML/CSS.
   * Template names are mapped to the existing CheckKey selectors:
   * menuToggle -> #menuButton
   * mainNav   -> #mobileMenu
   * language  -> existing .lang-button / setLanguage()
   *
   * Existing navigation to Login / Sign up is preserved.
   */

  const menuToggle = document.getElementById('menuButton');
  const mainNav = document.getElementById('mobileMenu');

  // Mobile menu
  if (menuToggle && mainNav) {
    const setMenuState = (isOpen) => {
      mainNav.classList.toggle('open', isOpen);
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    if (menuToggle.dataset.landingMenuBound !== 'true') {
      menuToggle.dataset.landingMenuBound = 'true';

      let lastMenuActivation = 0;

      const toggleLandingMenu = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        const now = Date.now();
        if (now - lastMenuActivation < 500) return;
        lastMenuActivation = now;

        setMenuState(!mainNav.classList.contains('open'));
      };

      menuToggle.addEventListener('touchend', toggleLandingMenu, {
        passive: false
      });

      menuToggle.addEventListener('pointerup', toggleLandingMenu, {
        passive: false
      });

      menuToggle.addEventListener('click', toggleLandingMenu, {
        passive: false
      });
    }

    mainNav.querySelectorAll('a, button').forEach(link => {
      if (link.dataset.landingMenuLinkBound === 'true') return;
      link.dataset.landingMenuLinkBound = 'true';

      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });
  }

  const openAuthPanel = (screenId, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (mainNav) mainNav.classList.remove('open');
    if (menuToggle) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }

    showScreen(screenId);
  };

  // Safari/iOS tap fallback for authentication navigation.
  // touchend handles Safari reliably; the short guard prevents the
  // following synthetic click from triggering the action twice.
  const bindSafariTap = (element, handler) => {
    if (!element || element.dataset.safariTapBound === 'true') return;

    element.dataset.safariTapBound = 'true';

    let lastTap = 0;

    const handleTap = event => {
      const now = Date.now();
      if (now - lastTap < 500) return;
      lastTap = now;

      if (event.type === 'touchend') {
        event.preventDefault();
      }

      handler(event);
    };

    element.addEventListener('touchend', handleTap, {
      passive: false
    });

    element.addEventListener('click', handleTap);
  };

  // Mobile Login / Sign up — direct listeners for reliable iPhone/Safari
  // navigation instead of relying only on document-level delegation.
  if (mainNav) {
    const mobileLogin =
      mainNav.querySelector('a[href="#"]') ||
      mainNav.querySelector('.login-link');

    const mobileSignUp =
      mainNav.querySelector('a.button-primary') ||
      mainNav.querySelector('.signup-btn');

    if (mobileLogin && mobileLogin.dataset.authNavigationBound !== 'true') {
      mobileLogin.dataset.authNavigationBound = 'true';
      bindSafariTap(mobileLogin, event => {
        openAuthPanel('screen-login', event);
      });
    }

    if (mobileSignUp && mobileSignUp.dataset.authNavigationBound !== 'true') {
      mobileSignUp.dataset.authNavigationBound = 'true';
      bindSafariTap(mobileSignUp, event => {
        openAuthPanel('screen-create-account', event);
      });
    }
  }

  // Desktop Login / Sign up — direct bindings to the actual landing header.
  const landingHeader = document.querySelector('.site-header');

  if (landingHeader) {
    const desktopLogin =
      landingHeader.querySelector('.header-actions .login-link');

    const desktopSignUp =
      landingHeader.querySelector('.header-actions a.button-primary') ||
      landingHeader.querySelector('.header-actions .signup-btn');

    if (desktopLogin && desktopLogin.dataset.authNavigationBound !== 'true') {
      desktopLogin.dataset.authNavigationBound = 'true';
      bindSafariTap(desktopLogin, event => {
        openAuthPanel('screen-login', event);
      });
    }

    if (desktopSignUp && desktopSignUp.dataset.authNavigationBound !== 'true') {
      desktopSignUp.dataset.authNavigationBound = 'true';
      bindSafariTap(desktopSignUp, event => {
        openAuthPanel('screen-create-account', event);
      });
    }
  }

  // Landing Hero — Create your account
  // Navigate directly to the existing Signup panel without changing
  // Firebase/Auth or any other application logic.
  const heroSignUp =
    document.querySelector('#landing-shell .hero-copy a.button-primary') ||
    document.querySelector('#landing-shell .hero-copy button.button-primary') ||
    document.querySelector('#landing-shell .hero a.button-primary') ||
    document.querySelector('#landing-shell .hero button.button-primary');

  if (heroSignUp && heroSignUp.dataset.authNavigationBound !== 'true') {
    heroSignUp.dataset.authNavigationBound = 'true';
    bindSafariTap(heroSignUp, event => {
      openAuthPanel('screen-create-account', event);
    });
  }

  // Existing EN / VI translation system is intentionally preserved.
  // The landing header uses .lang-button and setLanguage(), so we do not
  // create a second language system that could conflict with translation.
  document.querySelectorAll('.lang-button').forEach(button => {
    if (button.dataset.landingLanguageBound === 'true') return;
    button.dataset.landingLanguageBound = 'true';

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();

      const language = button.dataset.lang;
      if (language && typeof setLanguage === 'function') {
        setLanguage(language);
      }
    });
  });
}

function updateEmergencyAccessNavLabel() {
  const nav = document.getElementById('nav-inheritance');
  if (!nav) return;

  // Keep the existing icon/markup and only replace the visible label.
  const walker = document.createTreeWalker(nav, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    const value = node.nodeValue.trim();
    if (value === 'Vault Inheritance' || value === 'Inheritance' || value === 'Thừa kế' || value === 'Thừa kế Vault') {
      node.nodeValue = node.nodeValue.replace(value, window.t('Emergency Access'));
      break;
    }
  }

  nav.setAttribute('aria-label', window.t('Emergency Access'));
}

function bindCheckKeyLandingButtons() {
  // CHECK KEY headers use a single Home button to return to the Landing page.
  // Event delegation makes this work for every screen without touching
  // the existing authentication/dashboard event handlers.
  if (document.body.dataset.checkkeyLandingButtonBound === 'true') return;

  document.body.dataset.checkkeyLandingButtonBound = 'true';

  document.addEventListener('click', event => {
    const button = event.target.closest('.btn-back-to-landing');
    if (!button) return;

    event.preventDefault();
    event.stopPropagation();

    // Do not sign the user out. This is only a UI navigation action.
    showLandingPage();
  });
}

const CHECKKEY_DASHBOARD_SESSION_KEY = 'checkkey_dashboard_session';

function markDashboardSessionActive() {
  try {
    sessionStorage.setItem(CHECKKEY_DASHBOARD_SESSION_KEY, 'true');
  } catch (e) {}
}

function clearDashboardSessionMarker() {
  try {
    sessionStorage.removeItem(CHECKKEY_DASHBOARD_SESSION_KEY);
  } catch (e) {}
}

function wasDashboardActiveBeforeReload() {
  try {
    return sessionStorage.getItem(CHECKKEY_DASHBOARD_SESSION_KEY) === 'true';
  } catch (e) {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setupCheckKeyHeader();
  bindLandingNavigation();
  bindCheckKeyLandingButtons();
  updateEmergencyAccessNavLabel();

  // Restore persisted language after dynamic headers have been created.
  restoreLanguageState();

  // If the user reloads while already inside the Dashboard, show the Vault
  // Locked screen immediately. This avoids displaying the startup
  // "Checking your account..." screen while Firebase restores the session.
  // The auth observer will still verify the session and account state.
  if (wasDashboardActiveBeforeReload()) {
    showScreen('screen-vault-locked');
  } else {
    showStartupLoading();
  }
});

// ==========================================
// TRANSLATION MODULE (EN / VI)
// ==========================================
const TRANSLATIONS = {
  en: {},
  vi: {
     "Checking your account...": "Đang kiểm tra tài khoản của bạn...",
     "Create Account": "Tạo Tài khoản",
     "Password Manager": "Quản lý Mật khẩu",
     "Email": "Email",
     "Master password": "Mật khẩu chủ",
     "Show": "Hiện",
     "Hide": "Ẩn",
     "At least 12 characters": "Ít nhất 12 ký tự",
     "One lowercase letter": "Một chữ cái viết thường",
     "One uppercase letter": "Một chữ cái viết hoa",
     "One number": "Một chữ số",
     "One special character": "Một ký tự đặc biệt",
     "Confirm master password": "Xác nhận mật khẩu chủ",
     "Security question": "Câu hỏi bảo mật",
     "Select a question": "Chọn một câu hỏi",
     "What was the name of your first pet?": "Tên thú cưng đầu tiên của bạn là gì?",
     "What was the name of your first school?": "Tên ngôi trường đầu tiên của bạn là gì?",
     "Answer": "Câu trả lời",
     "Create account": "Tạo tài khoản",
     "Already have an account? ": "Đã có tài khoản? ",
     "Log in": "Đăng nhập",
     "Log In": "Đăng nhập",
     "We sent you a confirmation link.": "Chúng tôi đã gửi link xác nhận cho bạn.",
     "Can't find the email?": "Không tìm thấy email?",
     "Check your Spam/Junk folder. If you find it there, mark it as \"Not Spam\" so future emails from Check Key can reach your inbox.": "Kiểm tra thư mục rác. Nếu thấy, hãy đánh dấu \"Không phải thư rác\" để email có thể vào hộp thư chính.",
     "Back to log in": "Quay lại đăng nhập",
     "Remember me": "Ghi nhớ đăng nhập",
     "Create an account": "Tạo tài khoản mới",
     "Connection Error": "Lỗi Kết nối",
     "Unable to verify account status. Please try again.": "Không thể xác minh trạng thái tài khoản. Vui lòng thử lại.",
     "Try Again": "Thử lại",
     "Log Out": "Đăng xuất",
     "Log out": "Đăng xuất",
     "Vault Locked": "Vault Bị Khóa",
     "Please enter your master password to unlock your vault.": "Vui lòng nhập mật khẩu chủ để mở khóa vault của bạn.",
     "Unlock Vault": "Mở khóa Vault",
     "Account Scheduled for Deletion": "Tài khoản Đã Được Lên Lịch Xóa",
     "Your account and encrypted vault are scheduled for permanent deletion.": "Tài khoản và vault mã hóa của bạn đã được lên lịch xóa vĩnh viễn.",
     "You can cancel this request before:": "Bạn có thể hủy yêu cầu này trước:",
     "Cancel Account Deletion": "Hủy Xóa Tài khoản",
     "The cancellation period has ended. Your account is awaiting permanent deletion.": "Thời gian hủy đã kết thúc. Tài khoản của bạn đang chờ xóa vĩnh viễn.",
     "Dashboard": "Bảng điều khiển",
     "My Credentials": "Mật khẩu của tôi",
     "Search & History": "Tìm kiếm & Lịch sử",
     "Emergency Access": "Truy cập Khẩn cấp",
     "Security Settings": "Cài đặt Bảo mật",
     "Devices & Access": "Thiết bị & Quyền truy cập",
     "Devices access": "Quyền truy cập thiết bị",
     "Folders": "Thư mục",
     "Current Device": "Thiết bị hiện tại",
     "This device": "Thiết bị này",
     "Other Devices": "Thiết bị khác",
     "Current": "Hiện tại",
     "Sign out all other devices": "Đăng xuất tất cả thiết bị khác",
     "No other devices are currently connected.": "Hiện không có thiết bị khác đang kết nối.",
     "Access control": "Kiểm soát quyền truy cập",
     "Review your active devices and revoke access from devices you no longer use.": "Xem các thiết bị đang hoạt động và thu hồi quyền truy cập khỏi những thiết bị bạn không còn sử dụng.",
     "Revoke Access": "Thu hồi quyền truy cập",
     "Last active:": "Hoạt động lần cuối:",
     "IP:": "IP:",
     "Unknown device": "Thiết bị không xác định",
     "Unknown browser": "Trình duyệt không xác định",
     "Unknown OS": "Hệ điều hành không xác định",
     "Unable to load device information.": "Không thể tải thông tin thiết bị.",
     "Failed to revoke device access.": "Không thể thu hồi quyền truy cập thiết bị.",
     "Failed to sign out other devices.": "Không thể đăng xuất các thiết bị khác.",
     "Delete Folder": "Xóa thư mục",
     "Delete this folder? Credentials inside it will be moved to Unfiled and will not be deleted.": "Xóa thư mục này? Các mật khẩu bên trong sẽ được chuyển ra ngoài thư mục và không bị xóa.",
     "Folder deleted successfully.": "Đã xóa thư mục thành công.",
     "Unable to delete folder. Please try again.": "Không thể xóa thư mục. Vui lòng thử lại.",
     "Please select a folder first.": "Vui lòng chọn một thư mục trước.",
     "Select an option to manage your credentials.": "Chọn một tùy chọn để quản lý mật khẩu của bạn.",
     "Add Credential": "Thêm Mật khẩu",
     "View, add, edit or delete credentials": "Xem, thêm, sửa hoặc xóa mật khẩu",
     "Search accounts and view password history": "Tìm kiếm tài khoản và xem lịch sử mật khẩu",
     "Review password display settings": "Xem lại cài đặt hiển thị mật khẩu",
     "Recent Credentials": "Mật khẩu gần đây",
     "View all": "Xem tất cả",
     "0 credentials": "0 mật khẩu",
     "Recently updated": "Cập nhật gần đây",
     "Oldest updated": "Cập nhật cũ nhất",
     "Name A–Z": "Tên A–Z",
     "Name Z–A": "Tên Z–A",
     "All Folders": "Tất cả thư mục",
     "Unfiled": "Chưa phân loại",
     "Active": "Đang hoạt động",
     "Archived": "Đã lưu trữ",
     "All": "Tất cả",
     "New Folder": "Thư mục mới",
     "Platform": "Nền tảng",
     "Username or email": "Tên đăng nhập hoặc email",
     "Category": "Danh mục",
     "Action": "Hành động",
     "No credentials here": "Không có mật khẩu nào ở đây",
     "Adjust your filters or add a new credential to begin.": "Điều chỉnh bộ lọc hoặc thêm mật khẩu mới để bắt đầu.",
     "← Back to My Credentials": "← Quay lại Mật khẩu của tôi",
     "Platform name": "Tên nền tảng",
     "e.g. Gmail": "VD: Gmail",
     "Education": "Giáo dục",
     "Social": "Mạng xã hội",
     "Work": "Công việc",
     "Finance": "Tài chính",
     "Other": "Khác",
     "Folders": "Thư mục",
     "Manage your folders": "Quản lý các thư mục của bạn",
     "Organize your credentials into folders. Deleting a folder will not delete its credentials.": "Sắp xếp mật khẩu vào các thư mục. Xóa thư mục sẽ không xóa các mật khẩu bên trong.",
     "No folders yet": "Chưa có thư mục nào",
     "Create your first folder to organize your credentials.": "Tạo thư mục đầu tiên để sắp xếp mật khẩu của bạn.",
     "credentials": "mật khẩu",
     "Open Folder": "Mở thư mục",
     "Delete Folder": "Xóa thư mục",
     "Delete this folder? Credentials inside it will be moved to Unfiled and will not be deleted.": "Xóa thư mục này? Các mật khẩu bên trong sẽ được chuyển ra ngoài thư mục và không bị xóa.",
     "Folder deleted successfully.": "Đã xóa thư mục thành công.",
     "Please select a folder first.": "Vui lòng chọn một thư mục trước.",
     "Folder": "Thư mục",
     "Custom Category": "Danh mục tùy chỉnh",
     "Type your category name": "Nhập tên danh mục của bạn",
     "This category will be grouped under Other in Search & History.": "Danh mục này sẽ được nhóm vào mục Khác trong Tìm kiếm & Lịch sử.",
     "Website (Optional)": "Trang web (Không bắt buộc)",
     "example.com": "example.com",
     "user@example.com": "user@example.com",
     "Password": "Mật khẩu",
     "Use demo text only": "Chỉ sử dụng văn bản demo",
     "Do not enter a real password. The prototype never persists this value.": "Đừng nhập mật khẩu thật. Bản mẫu này không lưu trữ giá trị đó.",
     "Notes": "Ghi chú",
     "Optional notes": "Ghi chú (không bắt buộc)",
     "Cancel": "Hủy",
     "Save credential": "Lưu mật khẩu",
     "Credential Details": "Chi tiết mật khẩu",
     "Website": "Trang web",
     "Copy": "Sao chép",
     "Last updated": "Cập nhật lần cuối",
     "Archive": "Lưu trữ",
     "Restore": "Khôi phục",
     "Edit": "Sửa",
     "Delete": "Xóa",
     "Search by platform, username, website or notes": "Tìm kiếm theo nền tương, tên đăng nhập, trang web hoặc ghi chú",
     "Apply": "Áp dụng",
     "Clear": "Xóa bộ lọc",
     "0 results found": "Tìm thấy 0 kết quả",
     "No matching credentials found.": "Không tìm thấy mật khẩu nào phù hợp.",
     "All credentials": "Tất cả mật khẩu",
     "← Back to Search": "← Quay lại Tìm kiếm",
     "Platform:": "Nền tảng:",
     "Website:": "Trang web:",
     "Username or email:": "Tên đăng nhập hoặc email:",
     "Current password:": "Mật khẩu hiện tại:",
     "Last updated:": "Cập nhật lần cuối:",
     "View password history": "Xem lịch sử mật khẩu",
     "← Back to credential": "← Quay lại mật khẩu",
     "Current password": "Mật khẩu hiện tại",
     "Previous passwords": "Mật khẩu trước đây",
     "Passwords are hidden by default.": "Mật khẩu được ẩn theo mặc định.",
     "Designate someone to inherit your vault.": "Chỉ định người thừa kế vault của bạn.",
     "Pending Invitations": "Lời mời Đang chờ",
     "Inherited Vaults": "Vault Được Thừa Kế",
     "Change Master Password": "Đổi Mật khẩu Chủ",
     "Current master password": "Mật khẩu chủ hiện tại",
     "Continue": "Tiếp tục",
     "Delete Account": "Xóa Tài khoản",
     "Permanently delete your account and all encrypted vault data.": "Xóa vĩnh viễn tài khoản và tất cả dữ liệu vault mã hóa của bạn.",
     "Security Verification": "Xác minh Bảo mật",
     "Answer your security question": "Trả lời câu hỏi bảo mật của bạn",
     "Verify": "Xác minh",
     "Set New Master Password": "Đặt Mật Khẩu Chủ Mới",
     "New master password": "Mật khẩu chủ mới",
     "Confirm new master password": "Xác nhận mật khẩu chủ mới",
     "Update password": "Cập nhật mật khẩu",
     "Your master password has been changed.": "Mật khẩu chủ của bạn đã được thay đổi.",
     "Log in again": "Đăng nhập lại",
     "Confirm Account Deletion": "Xác nhận Xóa Tài khoản",
     "This action will schedule your account, vault settings, folders, and all credentials for permanent deletion. You will have 3 days to cancel this request by logging back in.": "Thao tác này sẽ lên lịch xóa vĩnh viễn tài khoản, cài đặt vault, thư mục và tất cả mật khẩu. Bạn có 3 ngày để hủy yêu cầu này bằng cách đăng nhập lại.",
     "Type ": "Nhập ",
     " to confirm": " để xác nhận",
     "Possible Duplicate Credential": "Có Thể Trùng Lặp Mật Khẩu",
     "A credential for this platform and username already exists.": "Một mật khẩu cho nền tảng và tên đăng nhập này đã tồn tại.",
     "Do you want to save another credential anyway?": "Bạn có muốn lưu thêm một mật khẩu khác không?",
     "Go Back": "Quay lại",
     "Save Anyway": "Vẫn Lưu",
     "Create Folder": "Tạo Thư Mục",
     "Folder Name": "Tên thư mục",
     "e.g. Work Accounts": "VD: Tài khoản công việc",
     "Create": "Tạo",
     "Add Inheritor": "Thêm Người Thừa Kế",
     "The inheritor will have VIEW ONLY access to your vault if they accept the invitation.": "Người thừa kế sẽ có quyền CHỈ XEM đối với vault nếu họ chấp nhận lời mời.",
     "Inheritor Email": "Email Người Thừa Kế",
     "email@example.com": "email@example.com",
     "Send Invitation": "Gửi Lời Mời",
     "You were logged out due to inactivity.": "Bạn đã bị đăng xuất do không hoạt động.",
     "Confirm action": "Xác nhận thao tác",
     "Are you sure?": "Bạn có chắc chắn không?",
     "Credential saved": "Đã lưu mật khẩu",
     "Your credential has been saved.": "Mật khẩu của bạn đã được lưu.",
     "View credential": "Xem mật khẩu",
     "Done": "Hoàn tất",
     "Include this credential in Emergency Access": "Bao gồm mật khẩu này trong Truy cập Khẩn cấp",
     "If checked, your designated inheritor will be able to view this credential.": "Nếu chọn, người thừa kế của bạn sẽ có thể xem mật khẩu này.",
     
     // RECOVERY / FORGOT PASSWORD SPECIFIC
     "Forgot Master Password?": "Quên Mật khẩu Chủ?",
     "Forgot Password": "Quên mật khẩu",
     "Recover Vault Access": "Khôi phục Truy cập Vault",
     "Enter your email and 6-digit Recovery PIN to restore access.": "Nhập email và mã PIN khôi phục gồm 6 chữ số để khôi phục truy cập.",
     "Recovery Email": "Email Khôi phục",
     "Enter your recovery email": "Nhập email khôi phục của bạn",
     "Recovery PIN": "Mã PIN Khôi phục",
     "Enter your 6-digit Recovery PIN": "Nhập mã PIN khôi phục 6 chữ số",
     "Process Recovery": "Xử lý Khôi phục",
     "Vault Recovered Successfully": "Khôi phục Vault Thành công",
     "Your master password has been reset.": "Mật khẩu chủ của bạn đã được đặt lại.",
     "Back to login": "Quay lại đăng nhập",
     "Unable to recover your vault.": "Không thể khôi phục vault của bạn.",

     // JS Dynamic text:
     "Account Locked": "Tài khoản Bị Khóa",
     "Too many failed login attempts.": "Quá nhiều lần đăng nhập thất bại.",
     "Try again in:": "Thử lại sau:",
     "Use another account": "Sử dụng tài khoản khác",
     "Inherited Vault": "Vault Được Thừa Kế",
     "Owner: ": "Chủ sở hữu: ",
     "Access: View only": "Quyền truy cập: Chỉ xem",
     "Exit Inherited View": "Thoát Chế độ Thừa kế",
     "Credentials": "Mật khẩu",
     "No credentials found": "Không tìm thấy mật khẩu nào",
     "View": "Xem",
     "Logging in...": "Đang đăng nhập...",
     "Retrying...": "Đang thử lại...",
     "Saving...": "Đang lưu...",
     "Creating...": "Đang tạo...",
     "Sending...": "Đang gửi...",
     "Cancel Invitation": "Hủy Lời Mời",
     "Revoke Inheritance": "Thu Hồi Thừa Kế",
     "Revoking...": "Đang thu hồi...",
     "Decline": "Từ chối",
     "Accept": "Chấp nhận",
     "Access Vault": "Truy cập Vault",
     "Unlocking...": "Đang mở khóa...",
     "Updating...": "Đang cập nhật...",
     "Verifying...": "Đang xác minh...",
     "Scheduling...": "Đang lên lịch...",
     "Cancelling...": "Đang hủy...",
     "Processing...": "Đang xử lý...",
     "+ Add Inheritor": "+ Thêm Người Thừa Kế",
     "VIEW ONLY access. Cannot save credentials.": "Quyền CHỈ XEM. Không thể lưu mật khẩu.",
     "An archived credential for this platform and username already exists.": "Một mật khẩu đã lưu trữ cho nền tảng và tên đăng nhập này đã tồn tại.",
     "VIEW ONLY access. Cannot create folders.": "Quyền CHỈ XEM. Không thể tạo thư mục.",
     "Folder name is required.": "Vui lòng nhập tên thư mục.",
     "Folder created successfully.": "Đã tạo thư mục thành công.",
     "You cannot inherit your own vault.": "Bạn không thể thừa kế vault của chính mình.",
     "You already have a designated inheritor.": "Bạn đã chỉ định một người thừa kế.",
     "Invitation sent.": "Đã gửi lời mời.",
     "Failed to add inheritor.": "Thêm người thừa kế thất bại.",
     "Account scheduled for deletion.": "Tài khoản đã được lên lịch xóa.",
     "Incorrect master password.": "Mật khẩu chủ không chính xác.",
     "Too many attempts. Try again later.": "Quá nhiều lần thử. Vui lòng thử lại sau.",
     "Failed to schedule deletion.": "Lên lịch xóa thất bại.",
     "Deletion cancelled. Please log in again.": "Đã hủy xóa. Vui lòng đăng nhập lại.",
     "Invalid email or master password.": "Email hoặc mật khẩu chủ không hợp lệ.",
     "Too many login requests. Please try again later.": "Quá nhiều yêu cầu đăng nhập. Vui lòng thử lại sau.",
     "Incorrect master password or decryption failed.": "Mật khẩu chủ không đúng hoặc giải mã thất bại.",
     "Master password is required.": "Vui lòng nhập mật khẩu chủ.",
     "Unable to verify account status. Please try again.": "Không thể xác minh trạng thái tài khoản. Vui lòng thử lại.",
     "Error unlocking vault. Please try again.": "Lỗi khi mở khóa vault. Vui lòng thử lại.",
     "Owner inheritance sync paused.": "Đồng bộ người chủ thừa kế bị tạm dừng.",
     "Inheritor sync paused.": "Đồng bộ người thừa kế bị tạm dừng.",
     "Inheritance revoked.": "Đã thu hồi quyền thừa kế.",
     "Failed to revoke inheritor.": "Thu hồi quyền thừa kế thất bại.",
     "Invitation declined.": "Đã từ chối lời mời.",
     "Action failed.": "Thao tác thất bại.",
     "Invitation accepted.": "Đã chấp nhận lời mời.",
     "Your vault access key is still being prepared.": "Khóa truy cập vault của bạn vẫn đang được chuẩn bị.",
     "Your RSA keys were not found. Please log in again to provision them.": "Không tìm thấy khóa RSA của bạn. Vui lòng đăng nhập lại để cấp phát.",
     "Switched to Inherited Vault": "Đã chuyển sang Vault Thừa Kế",
     "Failed to access inherited vault.": "Không thể truy cập vault thừa kế.",
     "Returned to your vault.": "Đã quay lại vault của bạn.",
     "Unable to load folders": "Không thể tải danh sách thư mục.",
     "You do not have permission to create folders.": "Bạn không có quyền tạo thư mục.",
     "Unable to create folder. Please try again.": "Không thể tạo thư mục. Vui lòng thử lại.",
     "Credential was removed.": "Mật khẩu đã bị xóa.",
     "Access Denied to credentials.": "Bị từ chối truy cập mật khẩu.",
     "Connection error. Sync paused.": "Lỗi kết nối. Đồng bộ bị tạm dừng.",
     "Password copied.": "Đã sao chép mật khẩu.",
     "Copy is unavailable in this browser.": "Trình duyệt này không hỗ trợ sao chép.",
     "Credential archived.": "Đã lưu trữ mật khẩu.",
     "Failed to archive.": "Lưu trữ thất bại.",
     "Credential restored.": "Đã khôi phục mật khẩu.",
     "Failed to restore.": "Khôi phục thất bại.",
     "Credential deleted.": "Đã xóa mật khẩu.",
     "Failed to delete credential.": "Xóa mật khẩu thất bại.",
     "Failed to save credential.": "Lưu mật khẩu thất bại.",
     "Your changes have been saved.": "Thay đổi của bạn đã được lưu.",
     "Failed to update credential.": "Cập nhật mật khẩu thất bại.",
     "Platform name is required.": "Vui lòng nhập tên nền tương.",
     "Username or email is required.": "Vui lòng nhập tên đăng nhập hoặc email.",
     "Use a fictional prototype password.": "Vui lòng sử dụng mật khẩu giả định.",
     "Enter a name for this category.": "Vui lòng nhập tên cho danh mục này.",
     "Please enter a valid email.": "Vui lòng nhập một email hợp lệ.",
     "Current password is required.": "Vui lòng nhập mật khẩu hiện tại.",
     "No user logged in.": "Không có người dùng nào đăng nhập.",
     "Answer is required.": "Vui lòng nhập câu trả lời.",
     "Please verify your current password first.": "Vui lòng xác minh mật khẩu hiện tại trước.",
     "Incorrect security answer.": "Câu trả lời bảo mật không đúng.",
     "An error occurred during verification.": "Đã xảy ra lỗi trong quá trình xác minh.",
     "Authentication expired. Please start over.": "Xác thực đã hết hạn. Vui lòng bắt đầu lại.",
     "Vault is locked. Cannot change password.": "Vault đang bị khóa. Không thể đổi mật khẩu.",
     "New master password must be different from your current password.": "Mật khẩu chủ mới phải khác với mật khẩu hiện tại.",
     "Password updated, but sync was interrupted. Please log in again.": "Đã cập nhật mật khẩu, nhưng đồng bộ bị gián đoạn. Vui lòng đăng nhập lại.",
     "Session expired. Please enter your current password again.": "Phiên đăng nhập hết hạn. Vui lòng nhập lại mật khẩu hiện tại.",
     "Email is already registered.": "Email đã được đăng ký.",
     "Incorrect current password.": "Mật khẩu hiện tại không đúng.",
     "Network connection failed. Please try again.": "Lỗi kết nối mạng. Vui lòng thử lại.",
     "Database permission denied.": "Bị từ chối quyền truy cập cơ sở dữ liệu.",
     "Error ": "Lỗi ",
     "Your Inheritor": "Người Thừa Kế Của Bạn",
     "Status: ": "Trạng thái: ",
     "From: ": "Từ: ",
     "Status: Active | Access: View only": "Trạng thái: Hoạt động | Quyền: Chỉ xem",
     "Delete credential?": "Xóa mật khẩu?",
     "This action cannot be undone and will be permanently removed from your vault.": "Hành động này không thể hoàn tác và sẽ bị xóa vĩnh viễn khỏi vault.",
     "Edit Credential": "Sửa Mật khẩu",
     "No active credentials yet.": "Chưa có mật khẩu nào hoạt động.",
     "No previous prototype password": "Không có mật khẩu giả định trước đây",
     "Not available": "Không khả dụng",
     "No notes added.": "Không có ghi chú nào.",
     "Save changes": "Lưu thay đổi",
     "pending": "đang chờ",
     "active": "đang hoạt động",
     "revoked": "đã thu hồi",
     "declined": "đã từ chối",
     "Sort credentials": "Sắp xếp mật khẩu",
     "Filter by folder": "Lọc theo thư mục",
     "Filter by status": "Lọc theo trạng thái",
     "Filter by platform": "Lọc theo nền tảng",
     "Filter by category": "Lọc theo danh mục",
     
     // RECOVERY PIN TRANSLATIONS
     "Recovery PIN must be exactly 6 digits.": "Recovery PIN phải đúng 6 chữ số.",
     "Recovery PINs do not match.": "Recovery PIN không khớp.",
     "Unable to initialize recovery. Please try again.": "Không thể khởi tạo khôi phục. Vui lòng thử lại.",
     "Please wait for account verification.": "Vui lòng đợi xác thực tài khoản.",
     "Recovery failed.": "Khôi phục thất bại.",
     "Invalid Recovery PIN.": "Mã PIN Khôi Phục không hợp lệ.",
     "Session expired. Please start over.": "Phiên làm việc hết hạn. Vui lòng thử lại.",
     "Vault not found.": "Không tìm thấy Vault.",
     "Recovery metadata not found.": "Không tìm thấy dữ liệu khôi phục.",
     "Passwords do not match.": "Mật khẩu không khớp.",
     "Use your Recovery PIN to create a new Master Password.": "Sử dụng mã PIN khôi phục của bạn để tạo Mật khẩu chủ mới.",
     "Back to Login": "Quay lại đăng nhập",
     "Create a New Master Password": "Tạo Mật Khẩu Chủ Mới",
     "Create a new Master Password to regain access to your account.": "Tạo Mật khẩu chủ mới để lấy lại quyền truy cập vào tài khoản của bạn.",
     "New Master Password": "Mật khẩu chủ mới",
     "Confirm New Master Password": "Xác nhận mật khẩu chủ mới",
     "Master Password Updated": "Mật khẩu chủ đã được cập nhật",
     "Your Master Password has been updated successfully.": "Mật khẩu chủ của bạn đã được cập nhật thành công.",
     "Set Up Recovery PIN": "Thiết lập Mã PIN Khôi Phục",
     "Create a 6-digit PIN to use if you forget your Master Password.": "Tạo một mã PIN 6 chữ số để sử dụng nếu bạn quên Mật khẩu chủ.",
     "Keep this PIN in a safe place. You will need it if you forget your Master Password.": "Giữ mã PIN này ở nơi an toàn. Bạn sẽ cần nó nếu bạn quên Mật khẩu chủ.",
     "Confirm Recovery PIN": "Xác nhận Mã PIN Khôi Phục",
     "Save & Continue": "Lưu & Tiếp tục",



     // Dynamic formats using variables
     "{{count}} credentials": "{{count}} mật khẩu",
     "1 credential": "1 mật khẩu",
     "Search results for “{{query}}”": "Kết quả tìm kiếm cho “{{query}}”",
     "{{count}} results found": "Tìm thấy {{count}} kết quả",
     "1 result found": "Tìm thấy 1 kết quả",
     "Invalid email or master password. Attempt {{attempt}}/5": "Email hoặc mật khẩu không hợp lệ. Lần thử {{attempt}}/5",
     "{{count}} credential(s) could not be decrypted.": "{{count}} mật khẩu không thể giải mã.",

     // ANALYTICS DASHBOARD
     "Analytics": "Phân tích",
     "CHECK KEY Analytics": "Phân tích CHECK KEY",
     "Last 7 Days": "7 ngày qua",
     "Last 30 Days": "30 ngày qua",
     "All Time": "Toàn thời gian",
     "Visitors": "Người truy cập",
     "Sessions": "Phiên",
     "Events": "Sự kiện",
     "Active Users": "Người dùng hoạt động",
     "User Activity": "Hoạt động người dùng",
     "Event Activity": "Hoạt động sự kiện",
     "Feature Usage": "Mức độ sử dụng tính năng",
     "No analytics data available for this period.": "Chưa có dữ liệu phân tích trong khoảng thời gian này.",
     "Loading analytics...": "Đang tải dữ liệu phân tích...",
     "Unable to load analytics data.": "Không thể tải dữ liệu phân tích.",
     "Recovery": "Khôi phục",
     "Inheritance": "Thừa kế",
     "Emergency Access": "Truy cập Khẩn cấp",
     "Security": "Bảo mật",
     "Inherited Vault": "Vault Được Thừa Kế",
     "Session Start": "Bắt đầu Phiên",
     "Search Performed": "Tìm kiếm Được Thực Hiện",
     "Feature View": "Xem Tính Năng",
     "Feature Exit": "Thoát Tính Năng",
     "Login Started": "Đăng nhập Đã Bắt đầu",
     "Login Success": "Đăng nhập thành công",
     "Signup Started": "Đăng ký Đã Bắt đầu",
     "Signup Success": "Đăng ký thành công",
     "Recovery Setup Started": "Thiết lập Khôi phục Đã Bắt đầu",
     "Recovery Setup Success": "Thiết lập khôi phục thành công",
     "Vault Unlock Started": "Mở khóa Vault Đã Bắt đầu",
     "Vault Unlock Success": "Mở khóa Vault thành công",
     "Analytics Test": "Kiểm tra Phân tích",
     "Inheritance Revoked": "Thừa kế Bị Hủy",
     "Inheritance Invitation Sent": "Lời mời Thừa kế Đã Gửi",
     "Inherited Vault Access Started": "Truy cập Vault Được Thừa Kế Đã Bắt đầu",
     "Inherited Vault Access Success": "Truy cập Vault được thừa kế thành công",
     "Login Unverified": "Đăng nhập Chưa Xác minh",
     "Credential Created": "Mật khẩu Đã Tạo",
     "Credential Viewed": "Mật khẩu Đã Xem",
     "Credential Updated": "Mật khẩu Đã Cập Nhật",
     "Credential Update Failed": "Cập nhật Mật khẩu Thất bại",
     "Credential Create Failed": "Tạo Mật khẩu Thất bại",
     "Credential Deleted": "Mật khẩu Đã Xóa",
     "Credential Delete Failed": "Xóa Mật khẩu Thất bại",
     "Credential Archived": "Mật khẩu Đã Lưu trữ",
     "Credential Archive Failed": "Lưu trữ Mật khẩu Thất bại",
     "Credential Restored": "Mật khẩu Đã Khôi phục",
     "Credential Restore Failed": "Khôi phục Mật khẩu Thất bại",
     "Credential Password Copied": "Đã Sao chép Mật khẩu",
     "Login Failed": "Đăng nhập Thất bại",
     "Signup Failed": "Đăng ký Thất bại",
     "Search View": "Xem Tìm kiếm",
     "Inheritance Invitation Accepted": "Lời mời Thừa kế Đã Được Chấp nhận",
     "Inheritance Invitation Declined": "Lời mời Thừa kế Đã Bị Từ chối",
     "Recovery Started": "Bắt đầu Khôi phục",
     "Recovery Verified": "Khôi phục Đã Xác minh",
     "Recovery Setup Failed": "Thiết lập Khôi phục Thất bại",
     "Recovery Password Reset Failed": "Đặt lại Mật khẩu Khôi phục Thất bại",
     "Inherited Vault Access Failed": "Truy cập Vault Được Thừa Kế Thất bại",
     "Inherited Vault Exit": "Thoát Vault Được Thừa Kế",
     "Vault Unlock Failed": "Mở khóa Vault Thất bại",
     "Logout": "Đăng xuất",
  }
};

window.t = function(key, vars = {}) {
    const lang = getStoredLanguage();
    let text = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) ? TRANSLATIONS[lang][key] : key;
    
    for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), v);
    }
    return text;
};

// System category translator (đồng bộ chuẩn hóa Category chống lỗi lưu nhầm tiếng Việt)
function translateCategory(cat) {
    const sysCats = ['Education', 'Social', 'Work', 'Finance', 'Other'];
    // Lọc ngược nếu dữ liệu trên DB đã lỡ bị lưu là Tiếng Việt
    const inverseMap = {
        'Giáo dục': 'Education',
        'Mạng xã hội': 'Social',
        'Công việc': 'Work',
        'Tài chính': 'Finance',
        'Khác': 'Other'
    };
    const engCat = inverseMap[cat] || cat;
    return sysCats.includes(engCat) ? window.t(engCat) : engCat;
}

// Khởi chạy quét toàn bộ thuộc tính [data-i18n] trong HTML an toàn hơn
function applyTranslationsToDOM() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
     const key = el.getAttribute('data-i18n');
     if (key) el.textContent = window.t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
     const key = el.getAttribute('data-i18n-placeholder');
     if (key) el.placeholder = window.t(key);
  });
  document.querySelectorAll('[data-i18n-label]').forEach(el => {
     const key = el.getAttribute('data-i18n-label');
     if (key) el.setAttribute('aria-label', window.t(key));
  });
}

// Translate the two device-access strings that are rendered without data-i18n.
function translateDeviceAccessText(language) {
  const translations = {
    en: {
      'Cảnh báo truy cập thiết bị': 'Device access warning',
      'Nếu một thiết bị bị thu hồi, bạn sẽ không còn khả năng đăng nhập vào tài khoản của mình từ thiết bị đó.':
        'If a device is revoked, you will no longer be able to log in to your account from that device.',
      'Quản lý các thiết bị có thể truy cập kho mật khẩu CheckKey của bạn.':
        'Manage the devices that can access your CheckKey vault.'
    },
    vi: {
      'Device access warning': 'Cảnh báo truy cập thiết bị',
      'If a device is revoked, you will no longer be able to log in to your account from that device.':
        'Nếu một thiết bị bị thu hồi, bạn sẽ không còn khả năng đăng nhập vào tài khoản của mình từ thiết bị đó.',
      'Manage the devices that can access your CheckKey vault.':
        'Quản lý các thiết bị có thể truy cập kho mật khẩu CheckKey của bạn.'
    }
  };

  const map = translations[language] || translations.en;
  const root = document.getElementById('screen-dashboard');
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach(node => {
    const value = (node.nodeValue || '').trim();
    if (!value || !Object.prototype.hasOwnProperty.call(map, value)) return;

    const leading = (node.nodeValue || '').match(/^\s*/)?.[0] || '';
    const trailing = (node.nodeValue || '').match(/\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${map[value]}${trailing}`;
  });
}

// CƠ CHẾ SWITCH MƯỢT MÀ TỨC THÌ (INSTANT UPDATE)
window.switchLanguage = function(lang) {
  if (lang !== 'vi' && lang !== 'en') lang = 'en';
  currentLanguage = lang;
  document.documentElement.lang = lang;
  localStorage.setItem('app_lang', lang);
  localStorage.setItem('checkkey-language', lang);
  if (typeof window.__checkkeySyncHeaderLanguage === 'function') {
    window.__checkkeySyncHeaderLanguage(lang);
  }
  document.querySelectorAll('.btn-back-to-landing').forEach(button => {
    button.textContent = lang === 'vi' ? 'Trang chủ' : 'Home';
  });
  applyTranslationsToDOM();

  // These dashboard elements are rendered dynamically and do not all carry
  // data-i18n attributes, so update them explicitly on every language switch.
  const newFolderButton = document.getElementById('folders-page-create');
  if (newFolderButton) {
    newFolderButton.textContent = `+ ${window.t('New Folder')}`;
  }

  translateDeviceAccessText(lang);

  if (activeVaultKey) {
      const folderSelect = document.getElementById("core2-input-folder");
      const currentFolderVal = folderSelect ? folderSelect.value : null;

      core2PopulateFolderFilter();
      populateFolderSelect(currentFolderVal);
      
      refreshAllViews();

      const activeView = document.querySelector('.dashboard-view.active')?.id;
      
      if (activeView === 'view-core2-form') {
          const heading = document.getElementById('core2-form-heading');
          const saveBtn = document.getElementById('core2-btn-save');
          if (core2CurrentId) {
              if (heading) heading.textContent = window.t('Edit Credential');
              if (saveBtn) saveBtn.textContent = window.t('Save changes');
          } else {
              if (heading) heading.textContent = window.t('Add Credential');
              if (saveBtn) saveBtn.textContent = window.t('Save credential');
          }
      } 
      else if (activeView === 'view-core2-detail' && core2CurrentId) {
          const c = getActiveCredentials().find(item => item.id === core2CurrentId);
          if (c) {
              document.getElementById('core2-detail-category').textContent = translateCategory(c.category);
              document.getElementById('core2-detail-notes').textContent = c.notes || window.t('No notes added.');
          }
          const output = document.getElementById('core2-detail-password');
          const btn = document.getElementById('core2-btn-show');
          if (output && btn) {
              const visible = output.dataset.visible === 'true';
              btn.textContent = visible ? window.t('Hide') : window.t('Show');
          }
      }
      else if (activeView === 'view-core3-detail' && core3CurrentCredentialId) {
          const el = document.getElementById('core3-selected-password');
          const btn = document.getElementById('core3-btn-show-selected');
          if (el && btn) {
              const visible = el.dataset.visible === 'true';
              btn.textContent = visible ? window.t('Hide') : window.t('Show');
          }
      }
      else if (activeView === 'view-core3-history' && core3CurrentHistoryId) {
          const el = document.getElementById('core3-current-password');
          const btn = document.getElementById('core3-btn-show-current');
          if (el && btn) {
              const visible = el.dataset.visible === 'true';
              btn.textContent = visible ? window.t('Hide') : window.t('Show');
          }
          
          document.querySelectorAll('[data-core3-toggle-history]').forEach(histBtn => {
              const index = histBtn.dataset.core3ToggleHistory;
              const histOutput = document.getElementById(`core3-history-password-${index}`);
              if (histOutput) {
                  const visible = histOutput.dataset.visible === 'true';
                  histBtn.textContent = visible ? window.t('Hide') : window.t('Show');
              }
          });
          
          const c = core2Credentials.find(item => item.id === core3CurrentHistoryId);
          if (c && (!c.history || !c.history.length)) {
              const histOutput0 = document.getElementById('core3-history-password-0');
              if (histOutput0) {
                  histOutput0.textContent = window.t('No previous prototype password');
              }
          }
      }
  }

  const displayQ = document.getElementById('display-sec-question');
  if (displayQ && tempAuthData && tempAuthData.userData) {
      const qMap = {
          'pet': window.t('What was the name of your first pet?'),
          'school': window.t('What was the name of your first school?')
      };
      displayQ.textContent = qMap[tempAuthData.userData.securityQuestion] || tempAuthData.userData.securityQuestion;
  }

  if (core2PendingAction) {
      const title = document.getElementById('core2-confirm-title');
      const msg = document.getElementById('core2-confirm-message');
      const btn = document.getElementById('core2-btn-confirm-action');
      if (title) title.textContent = window.t('Delete credential?');
      if (msg) msg.textContent = window.t('This action cannot be undone and will be permanently removed from your vault.');
      if (btn) btn.textContent = window.t('Delete');
  }
  
  const analyticsView = document.getElementById('view-analytics');
  if (analyticsView?.classList.contains('active') && analyticsDashboardData) {
      renderAnalyticsDashboard(analyticsDashboardData);
  }

  const loginBtn = document.querySelector('#form-login button[type="submit"]');
  if (manualLoginInProgress && loginBtn && loginBtn.disabled) {
      loginBtn.textContent = window.t('Logging in...');
  }
  const vaultBtn = document.querySelector('#form-vault-unlock button[type="submit"]');
  if (vaultUnlockInProgress && vaultBtn && vaultBtn.disabled) {
      vaultBtn.textContent = window.t('Unlocking...');
  }
};

document.addEventListener('DOMContentLoaded', applyTranslationsToDOM);

// ==========================================
// STARTUP ERROR HANDLING
// ==========================================
window.addEventListener('error', (e) => {
  const msg = e.message || (e.error && e.error.message) || '';
  if (msg.includes('Unchecked runtime.lastError')) return;
  if (document.getElementById('screen-startup')?.classList.contains('active')) {
    console.error("Startup error:", msg);
    showScreen('screen-account-error');
  }
});

window.addEventListener('unhandledrejection', (e) => {
  const msg = e.reason && e.reason.message ? e.reason.message : String(e.reason);
  if (msg.includes('Unchecked runtime.lastError')) return;
  if (document.getElementById('screen-startup')?.classList.contains('active')) {
    console.error("Startup promise rejection:", msg);
    showScreen('screen-account-error');
  }
});

// ==========================================
// FIREBASE CONFIGURATION (FETCHED FROM API)
// ==========================================
let firebaseConfig;
try {
  const configRes = await fetch('/api/frontend-config');
  if (!configRes.ok) throw new Error("Failed to fetch config");
  firebaseConfig = await configRes.json();
} catch (err) {
  console.error("Critical error: Unable to load Firebase configuration", err);
  if (document.getElementById('screen-startup')) {
    showScreen('screen-account-error');
  }
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ==========================================
// ANALYTICS AUTH BRIDGE
// Keeps Firebase Auth ownership in this file.
// Analytics receives only a short-lived Firebase ID token
// through its provider; no password, vault key, credential,
// recovery PIN, or private RSA material is exposed.
// ==========================================
if (window.CheckKeyAnalytics) {
  window.CheckKeyAnalytics.setAuthProvider(async () => {
    const user = auth.currentUser;

    if (!user) {
      return null;
    }

    return await user.getIdToken();
  });
}

// ==========================================
// ANALYTICS - EMERGENCY ACCESS (STEP 4.2)
// Non-blocking; never sends secrets or identifiers.
// ==========================================
function analyticsTrack(eventName, metadata = {}) {
  try {
    window.CheckKeyAnalytics?.track?.(eventName, metadata);
  } catch (err) {
    console.warn("[Analytics] Tracking failed:", err);
  }
}
function analyticsStartFeature(feature, metadata = {}) {
  try {
    window.CheckKeyAnalytics?.startFeature?.(feature, metadata);
  } catch (err) {
    console.warn("[Analytics] Feature tracking failed:", err);
  }
}
function analyticsStopFeature(feature, metadata = {}) {
  try {
    window.CheckKeyAnalytics?.stopFeature?.(feature, metadata);
  } catch (err) {
    console.warn("[Analytics] Feature tracking failed:", err);
  }
}

// ==========================================
// ANALYTICS DASHBOARD STATE (STEP 5.2)
// UI-only layer. Existing app logic is preserved.
// ==========================================
let analyticsDashboardInitialized = false;
let analyticsDashboardData = null;
let analyticsDashboardDays = 7;
let analyticsDashboardRequestId = 0;
let analyticsDashboardAdmin = false;

// ==========================================
// SESSION STATE & INACTIVITY TRACKING
// ==========================================
const INACTIVITY_LIMIT = 4 * 60 * 1000;
let lastActivityTime = 0;
let activityCheckInterval = null;
let isTrackingActivity = false;
let sessionExpiredByInactivity = false;
let mouseMoveTimeout = null;
let isSignupFlow = false; 
let isRecoveryFlow = false;

let tempAuthData = {
  reauthenticated: false,
  timestamp: null,
  userData: null,
  currentPwdHash: null,
  pwdSalt: null
};

// ==========================================
// RECOVERY STATE (MEMORY ONLY)
// ==========================================
let tempSignupRecoveryPin = null;
let tempSignupMasterPassword = null;
let tempRecoveryMetadata = null; 

// ==========================================
// CORE 4: CRYPTO CONSTANTS & STATE
// ==========================================
const KDF_ITERATIONS = 600000;
const VAULT_ENCRYPTION_VERSION = 1;

let activeVaultKey = null;
let activeVaultUid = null;
let myVaultKey = null; 
let currentRole = "owner"; 

let manualLoginInProgress = false;
let vaultUnlockInProgress = false;

let authTransitionId = 0;
let autoWrapInterval = null;

// ==========================================
// CORE 4: SYNC & MOCK DATA STATE
// ==========================================
let unsubscribeCredentials = null;
let credentialsListenerUid = null;
let credentialsListenerGeneration = 0;

let unsubscribeFolders = null;
let folderListenerUid = null;
let core2Folders = [];
let core2CurrentFolderId = null;

let core2Credentials = []; 
let inheritedCredentials = []; 
let core2CurrentId = null;
let core2PendingAction = null;
let core2LastSavedId = null;
let core3CurrentHistoryId = null;
let core3CurrentCredentialId = null;
let appToastTimer = null;

let core2PendingSaveCallback = null;

function getActiveCredentials() {
  return currentRole === 'inheritor' ? inheritedCredentials : core2Credentials;
}

let unsubscribeInheritanceOwner = null;
let unsubscribeInheritanceInheritor = null;
let ownerInheritanceDocs = [];
let inheritorPendingDocs = [];
let inheritorActiveDocs = [];

// ==========================================
// API HELPERS
// ==========================================
async function fetchVercelAPI(endpoint, method = 'GET', body = null) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");
  
  const token = await user.getIdToken(true);
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  
  const options = { method, headers };
  if (body) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  
  const res = await fetch(`/api/${endpoint}`, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Server error');
  }
  return data;
}

async function fetchPublicAPI(endpoint, method = 'POST', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  const res = await fetch(`/api/${endpoint}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Server error');
  return data;
}


// ==========================================
// DEVICES & ACCESS
// ==========================================
const CHECKKEY_DEVICE_ID_KEY = 'checkkey_device_id';
const CHECKKEY_DEVICE_LAST_SYNC_KEY = 'checkkey_device_last_sync';
const DEVICE_SYNC_INTERVAL = 5 * 60 * 1000;

let unsubscribeCurrentDevice = null;
let unsubscribeDevicesList = null;
let deviceAccessDocs = [];

function getCheckKeyDeviceId() {
  try {
    let deviceId = localStorage.getItem(CHECKKEY_DEVICE_ID_KEY);
    if (!deviceId) {
      deviceId = (window.crypto && typeof window.crypto.randomUUID === 'function')
        ? window.crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem(CHECKKEY_DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  } catch (error) {
    return `temporary-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

function getDeviceBrowser() {
  const ua = navigator.userAgent || '';
  if (/Edg\//i.test(ua)) return 'Microsoft Edge';
  if (/OPR\//i.test(ua)) return 'Opera';
  if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) return 'Chrome';
  if (/Firefox\//i.test(ua)) return 'Firefox';
  if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) return 'Safari';
  return window.t('Unknown browser');
}

function getDeviceOS() {
  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  if (/Windows NT/i.test(ua)) return 'Windows';
  if (/Mac OS X/i.test(ua) && !/Mobile/i.test(ua)) return 'macOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Linux/i.test(ua) || /Linux/i.test(platform)) return 'Linux';
  return window.t('Unknown OS');
}

function getDeviceName() {
  return `${getDeviceOS()} · ${getDeviceBrowser()}`;
}

async function getCurrentDeviceIP() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const response = await fetch('https://api64.ipify.org?format=json', {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (!response.ok) throw new Error('IP lookup failed');
    const data = await response.json();
    return data?.ip || '—';
  } catch (error) {
    return '—';
  }
}

function formatDeviceLastActive(value) {
  if (!value) return '—';
  try {
    const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return date.toLocaleString(currentLanguage === 'vi' ? 'vi-VN' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return '—';
  }
}

function stopDeviceAccessSubscriptions() {
  if (unsubscribeCurrentDevice) {
    unsubscribeCurrentDevice();
    unsubscribeCurrentDevice = null;
  }
  if (unsubscribeDevicesList) {
    unsubscribeDevicesList();
    unsubscribeDevicesList = null;
  }
  deviceAccessDocs = [];
}

function renderCurrentDevice(data = {}) {
  const nameEl = document.getElementById('current-device-name');
  const detailsEl = document.getElementById('current-device-details');
  const ipEl = document.getElementById('current-device-ip');
  if (!nameEl || !detailsEl || !ipEl) return;

  const deviceName = data.deviceName || getDeviceName();
  const browser = data.browser || getDeviceBrowser();
  const os = data.os || getDeviceOS();
  const ip = data.ipAddress || '—';

  nameEl.textContent = deviceName;
  detailsEl.textContent = `${os} · ${browser}`;
  ipEl.textContent = `${window.t('IP:')} ${ip}`;
}

function renderDeviceList() {
  const list = document.getElementById('devices-list');
  if (!list) return;

  const currentDeviceId = getCheckKeyDeviceId();
  const emptyState = document.getElementById('devices-empty-state');
  const otherDevices = deviceAccessDocs.filter(device =>
    device.id !== currentDeviceId && device.status !== 'revoked'
  );

  list.querySelectorAll('.device-card:not(.device-card-current)').forEach(el => el.remove());

  if (emptyState) emptyState.classList.toggle('hidden', otherDevices.length > 0);

  otherDevices
    .sort((a, b) => {
      const aTime = a.lastActiveAt?.toMillis?.() || new Date(a.lastActiveAt || 0).getTime() || 0;
      const bTime = b.lastActiveAt?.toMillis?.() || new Date(b.lastActiveAt || 0).getTime() || 0;
      return bTime - aTime;
    })
    .forEach(device => {
      const card = document.createElement('div');
      card.className = 'device-card';
      card.dataset.deviceId = device.id;

      const info = document.createElement('div');
      info.className = 'device-info';

      const icon = document.createElement('div');
      icon.className = 'device-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '⌘';

      const textWrap = document.createElement('div');

      const name = document.createElement('strong');
      name.textContent = device.deviceName || window.t('Unknown device');

      const details = document.createElement('span');
      details.className = 'device-meta';
      details.textContent = `${device.os || window.t('Unknown OS')} · ${device.browser || window.t('Unknown browser')}`;

      const lastActive = document.createElement('span');
      lastActive.className = 'device-meta';
      lastActive.textContent = `${window.t('Last active:')} ${formatDeviceLastActive(device.lastActive)}`;

      const ip = document.createElement('span');
      ip.className = 'device-meta';
      ip.textContent = `${window.t('IP:')} ${device.ipAddress || '—'}`;

      textWrap.appendChild(name);
      textWrap.appendChild(details);
      textWrap.appendChild(lastActive);
      textWrap.appendChild(ip);
      info.appendChild(icon);
      info.appendChild(textWrap);

      const revokeButton = document.createElement('button');
      revokeButton.type = 'button';
      revokeButton.className = 'btn-secondary btn-auto';
      revokeButton.textContent = window.t('Revoke Access');
      revokeButton.dataset.deviceId = device.id;
      revokeButton.addEventListener('click', () => revokeDeviceAccess(device.id));

      card.appendChild(info);
      card.appendChild(revokeButton);
      list.appendChild(card);
    });
}

async function initializeDeviceAccess(user) {
  if (!user) return;

  const deviceId = getCheckKeyDeviceId();
  const deviceRef = doc(db, 'users', user.uid, 'devices', deviceId);

  renderCurrentDevice();

  let shouldSync = true;
  try {
    const lastSync = Number(localStorage.getItem(CHECKKEY_DEVICE_LAST_SYNC_KEY) || 0);
    shouldSync = !lastSync || (Date.now() - lastSync >= DEVICE_SYNC_INTERVAL);
  } catch (error) {}

  if (shouldSync) {
    const ipAddress = await getCurrentDeviceIP();

    const deviceData = {
      deviceId,
      deviceName: getDeviceName(),
      browser: getDeviceBrowser(),
      os: getDeviceOS(),
      ipAddress,
      status: 'active',
      lastActive: serverTimestamp()
    };

    const existingDeviceSnapshot = await getDoc(deviceRef);

    if (!existingDeviceSnapshot.exists()) {
      await setDoc(deviceRef, {
        ...deviceData,
        createdAt: serverTimestamp()
      });
    } else {
      await setDoc(deviceRef, deviceData, { merge: true });
    }

    try {
      localStorage.setItem(CHECKKEY_DEVICE_LAST_SYNC_KEY, String(Date.now()));
    } catch (error) {}
  }

  stopDeviceAccessSubscriptions();

  unsubscribeCurrentDevice = onSnapshot(deviceRef, async snapshot => {
    if (!snapshot.exists()) return;

    const data = snapshot.data() || {};
    renderCurrentDevice(data);

    if (data.status === 'revoked') {
      stopDeviceAccessSubscriptions();
      lockVault();
      try { await signOut(auth); } catch (error) {}
      handleLogoutUI();
    }
  }, error => {
    console.warn('[Devices & Access] Current device listener failed:', error);
  });

  const devicesRef = collection(db, 'users', user.uid, 'devices');

  unsubscribeDevicesList = onSnapshot(devicesRef, snapshot => {
    deviceAccessDocs = snapshot.docs.map(deviceDoc => ({
      id: deviceDoc.id,
      ...deviceDoc.data()
    }));
    renderDeviceList();
  }, error => {
    console.warn('[Devices & Access] Device list listener failed:', error);
    const list = document.getElementById('devices-list');
    if (list) {
      list.innerHTML = `
        <div class="device-empty-state">
          <p class="text-muted">${window.t('Unable to load device information.')}</p>
        </div>
      `;
    }
  });
}

async function revokeDeviceAccess(deviceId) {
  if (!deviceId || !auth.currentUser) return;
  const device = deviceAccessDocs.find(item => item.id === deviceId);
  if (!device) return;

  try {
    await updateDoc(doc(db, 'users', auth.currentUser.uid, 'devices', deviceId), {
      status: 'revoked',
      lastActive: serverTimestamp()
    });
    analyticsTrack('device_access_revoked', { source: 'devices_access' });
  } catch (error) {
    console.error('[Devices & Access] Failed to revoke device:', error);
    showAppToast(window.t('Failed to revoke device access.'));
  }
}

async function signOutAllOtherDevices() {
  if (!auth.currentUser) return;

  const currentDeviceId = getCheckKeyDeviceId();
  const otherDevices = deviceAccessDocs.filter(device =>
    device.id !== currentDeviceId && device.status !== 'revoked'
  );

  if (!otherDevices.length) return;

  try {
    await Promise.all(
      otherDevices.map(device =>
        updateDoc(doc(db, 'users', auth.currentUser.uid, 'devices', device.id), {
          status: 'revoked',
          lastActive: serverTimestamp()
        })
      )
    );
    analyticsTrack('device_access_revoked_all', {
      source: 'devices_access',
      count: otherDevices.length
    });
  } catch (error) {
    console.error('[Devices & Access] Failed to revoke other devices:', error);
    showAppToast(window.t('Failed to sign out other devices.'));
  }
}

// ==========================================
// STEP 5.2: ANALYTICS DASHBOARD UI
// Injected from JS so index.html and style.css
// do not need structural changes.
// ==========================================

function injectAnalyticsDashboardStyles() {
  if (document.getElementById('checkkey-analytics-dashboard-styles')) return;

  const style = document.createElement('style');
  style.id = 'checkkey-analytics-dashboard-styles';
  style.textContent = `
    /* All Analytics styles are strictly scoped. */
    #view-analytics {
      width: 100%;
      box-sizing: border-box;
    }

    #view-analytics .ck-analytics-card {
      width: 100%;
      box-sizing: border-box;
    }

    #view-analytics .ck-analytics-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      margin-bottom: 22px;
    }

    #view-analytics .ck-analytics-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.2;
      color: var(--text-main);
    }

    #view-analytics .ck-analytics-subtitle {
      margin: 7px 0 0;
      color: var(--text-muted);
      font-size: 14px;
    }

    #view-analytics .ck-analytics-range {
      min-width: 150px;
      height: 40px;
      padding: 0 12px;
      border: 1px solid var(--input-border);
      border-radius: 8px;
      background: #fff;
      color: var(--text-main);
      font: inherit;
      cursor: pointer;
    }

    #view-analytics .ck-analytics-overview {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-bottom: 14px;
    }

    #view-analytics .ck-analytics-metric {
      min-width: 0;
      padding: 16px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: #fff;
    }

    #view-analytics .ck-analytics-metric-label {
      margin: 0;
      color: var(--text-muted);
      font-size: 13px;
    }

    #view-analytics .ck-analytics-metric-value {
      margin: 5px 0 0;
      color: var(--text-main);
      font-size: 25px;
      line-height: 1.1;
      font-weight: 700;
    }

    #view-analytics .ck-analytics-section {
      margin-top: 14px;
      padding: 18px;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      background: #fff;
    }

    #view-analytics .ck-analytics-section-title {
      margin: 0 0 16px;
      font-size: 17px;
      color: var(--text-main);
    }

    #view-analytics .ck-analytics-chart-wrap {
      width: 100%;
      overflow-x: auto;
    }

    #view-analytics .ck-analytics-chart {
      display: block;
      width: 100%;
      min-width: 520px;
      height: 220px;
      color: var(--primary-btn);
    }

    #view-analytics .ck-analytics-feature-row {
      display: grid;
      grid-template-columns: minmax(130px, 1.1fr) minmax(120px, 2.2fr) 55px;
      gap: 12px;
      align-items: center;
      margin: 12px 0;
    }

    #view-analytics .ck-analytics-feature-name {
      min-width: 0;
      color: var(--text-main);
      font-size: 14px;
      font-weight: 400 !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #view-analytics .ck-analytics-bar-track {
      width: 100%;
      height: 10px;
      overflow: hidden;
      border-radius: 999px;
      background: #eeeaf9;
    }

    #view-analytics .ck-analytics-bar-fill {
      height: 100%;
      width: 0;
      border-radius: 999px;
      background: var(--primary-btn);
      transition: width 220ms ease;
    }

    #view-analytics .ck-analytics-feature-value {
      text-align: right;
      color: var(--text-main);
      font-size: 14px;
      font-weight: 700;
    }

    #view-analytics .ck-analytics-event-row {
      display: grid;
      grid-template-columns: minmax(150px, 1.1fr) minmax(120px, 2.2fr) 86px;
      gap: 12px;
      align-items: center;
      margin: 12px 0;
    }

    #view-analytics .ck-analytics-event-name {
      min-width: 0;
      color: var(--text-main);
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    #view-analytics .ck-analytics-event-value {
      text-align: right;
      color: var(--text-main);
      font-size: 14px;
      font-weight: 700;
      white-space: nowrap;
    }

    #view-analytics .ck-analytics-status {
      margin: 0;
      padding: 18px;
      border: 1px dashed var(--border-color);
      border-radius: 10px;
      color: var(--text-muted);
      text-align: center;
      background: #fff;
    }

    #view-analytics .ck-analytics-meta {
      display: flex;
      justify-content: flex-end;
      margin-top: 14px;
      color: var(--text-muted);
      font-size: 12px;
    }

    @media (max-width: 900px) {
      #view-analytics .ck-analytics-overview {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 600px) {
      #view-analytics .ck-analytics-header {
        align-items: stretch;
      }

      #view-analytics .ck-analytics-range {
        width: 100%;
      }

      #view-analytics .ck-analytics-overview {
        grid-template-columns: 1fr 1fr;
      }

      #view-analytics .ck-analytics-metric {
        padding: 13px;
      }

      #view-analytics .ck-analytics-metric-value {
        font-size: 21px;
      }

      #view-analytics .ck-analytics-feature-row,
      #view-analytics .ck-analytics-event-row {
        grid-template-columns: 1fr 86px;
      }

      #view-analytics .ck-analytics-bar-track {
        grid-column: 1 / -1;
        grid-row: 2;
      }
    }

    @media (max-width: 380px) {
      #view-analytics .ck-analytics-overview {
        grid-template-columns: 1fr;
      }
    }
  `;

  document.head.appendChild(style);
}

function ensureAnalyticsDashboardUI() {
  if (analyticsDashboardInitialized) return;

  const dashboardContent = document.querySelector('.dashboard-content');
  const sidebarNav = document.querySelector('.sidebar nav ul');

  if (!dashboardContent || !sidebarNav) {
    console.warn('[Analytics Dashboard] Dashboard DOM not ready.');
    return;
  }

  injectAnalyticsDashboardStyles();

  // Add a hidden admin-only nav item. It becomes visible only after
  // the private summary endpoint authorizes the current Firebase UID.
  if (!document.getElementById('nav-analytics')) {
    const li = document.createElement('li');

    li.innerHTML = `
      <a href="#"
         class="nav-item"
         id="nav-analytics"
         data-i18n="Analytics"
         style="display: none;">
        ${window.t('Analytics')}
      </a>
    `;

    sidebarNav.appendChild(li);

    li.querySelector('#nav-analytics')?.addEventListener('click', async (e) => {
      e.preventDefault();

      if (!analyticsDashboardAdmin) {
        const allowed = await checkAnalyticsAdminAccess();
        if (!allowed) return;
      }

      showDashboardView('view-analytics');
      await loadAnalyticsDashboard(analyticsDashboardDays);
    });
  }

  // Inject the Analytics screen into the existing dashboard.
  if (!document.getElementById('view-analytics')) {
    const analyticsView = document.createElement('div');

    analyticsView.id = 'view-analytics';
    analyticsView.className = 'dashboard-view view-wide';

    analyticsView.innerHTML = `
      <div class="view-card ck-analytics-card">
        <div class="ck-analytics-header">
          <div>
            <h3 class="ck-analytics-title" data-i18n="CHECK KEY Analytics">
              ${window.t('CHECK KEY Analytics')}
            </h3>
            <p class="ck-analytics-subtitle" data-i18n="Feature Usage">
              ${window.t('Feature Usage')}
            </p>
          </div>

          <select
            id="analytics-range"
            class="ck-analytics-range"
            aria-label="Analytics date range">
            <option value="7">${window.t('Last 7 Days')}</option>
            <option value="30">${window.t('Last 30 Days')}</option>
            <option value="all">${window.t('All Time')}</option>
          </select>
        </div>

        <div id="analytics-loading" class="ck-analytics-status hidden">
          ${window.t('Loading analytics...')}
        </div>

        <div id="analytics-error" class="ck-analytics-status hidden"></div>

        <div id="analytics-content">
          <div class="ck-analytics-overview">
            <div class="ck-analytics-metric">
              <p class="ck-analytics-metric-label" data-i18n="Visitors">${window.t('Visitors')}</p>
              <p class="ck-analytics-metric-value" id="analytics-users">0</p>
            </div>

            <div class="ck-analytics-metric">
              <p class="ck-analytics-metric-label" data-i18n="Sessions">${window.t('Sessions')}</p>
              <p class="ck-analytics-metric-value" id="analytics-sessions">0</p>
            </div>

            <div class="ck-analytics-metric">
              <p class="ck-analytics-metric-label" data-i18n="Events">${window.t('Events')}</p>
              <p class="ck-analytics-metric-value" id="analytics-events">0</p>
            </div>

            <div class="ck-analytics-metric">
              <p class="ck-analytics-metric-label" data-i18n="Active Users">${window.t('Active Users')}</p>
              <p class="ck-analytics-metric-value" id="analytics-active-users">0</p>
            </div>
          </div>

          <div class="ck-analytics-section">
            <h4 class="ck-analytics-section-title" data-i18n="User Activity">
              ${window.t('User Activity')}
            </h4>

            <div class="ck-analytics-chart-wrap">
              <svg
                id="analytics-activity-chart"
                class="ck-analytics-chart"
                viewBox="0 0 760 220"
                role="img"
                aria-label="User activity chart"></svg>
            </div>
          </div>

          <div class="ck-analytics-section">
            <h4 class="ck-analytics-section-title" data-i18n="Feature Usage">
              ${window.t('Feature Usage')}
            </h4>

            <div id="analytics-feature-list"></div>
          </div>

          <div class="ck-analytics-section">
            <h4 class="ck-analytics-section-title" data-i18n="Event Activity">
              ${window.t('Event Activity')}
            </h4>

            <div id="analytics-event-list"></div>
          </div>

          <div class="ck-analytics-meta">
            <span id="analytics-date-range"></span>
          </div>
        </div>
      </div>
    `;

    dashboardContent.appendChild(analyticsView);

    document.getElementById('analytics-range')?.addEventListener('change', async (e) => {
      const value = e.target.value;
      analyticsDashboardDays = value === 'all' ? 'all' : Number(value);
      await loadAnalyticsDashboard(analyticsDashboardDays);
    });
  }

  analyticsDashboardInitialized = true;
}

async function checkAnalyticsAdminAccess() {
  const nav = document.getElementById('nav-analytics');

  try {
    const days = analyticsDashboardDays || 7;

    const response = await fetchVercelAPI(
      `analytics-summary?days=${encodeURIComponent(days)}`
    );

    if (!response?.success || !response?.summary) {
      throw new Error('Invalid analytics response.');
    }

    analyticsDashboardAdmin = true;

    if (nav) nav.style.display = '';

    analyticsDashboardData = response;

    return true;
  } catch (error) {
    analyticsDashboardAdmin = false;

    if (nav) {
      nav.style.display = 'none';
      nav.classList.remove('active');
    }

    // Access failures must never block the rest of CHECK KEY.
    console.warn(
      '[Analytics Dashboard] Admin access check failed:',
      error?.message || error
    );

    return false;
  }
}

function hideAnalyticsDashboardAccess() {
  analyticsDashboardAdmin = false;
  analyticsDashboardData = null;

  const nav = document.getElementById('nav-analytics');

  if (nav) {
    nav.style.display = 'none';
    nav.classList.remove('active');
  }

  const analyticsView = document.getElementById('view-analytics');

  if (analyticsView?.classList.contains('active')) {
    showDashboardView('view-dashboard');
  }
}

function formatAnalyticsNumber(value) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number.toLocaleString()
    : '0';
}

function getAnalyticsFeatureLabel(feature) {
  const labels = {
    dashboard: window.t('Dashboard'),
    my_credentials: window.t('Credentials'),
    search_history: window.t('Search & History'),
    recovery: window.t('Recovery'),
    vault_inheritance: window.t('Inheritance'),
    inherited_vault: window.t('Inherited Vault'),
    security_settings: window.t('Security'),
    folders: window.t('Folders'),
    devices_access: window.t('Devices access')
  };

  return labels[feature] || String(feature).replace(/_/g, ' ');
}

function renderAnalyticsActivity(activity = []) {
  const svg = document.getElementById('analytics-activity-chart');
  const wrap = svg?.closest('.ck-analytics-chart-wrap');

  if (!svg) return;

  svg.innerHTML = '';

  const existingTooltip = document.getElementById('analytics-activity-tooltip');
  if (existingTooltip) existingTooltip.remove();

  const width = 760;
  const height = 250;
  const padLeft = 54;
  const padRight = 14;
  const padTop = 22;
  const padBottom = 38;

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('aria-label', window.t('User activity chart'));

  const chartWidth = width - padLeft - padRight;
  const chartHeight = height - padTop - padBottom;

  const points = Array.isArray(activity)
    ? activity.filter(item => item && typeof item.date === 'string')
    : [];

  if (!points.length) {
    const empty = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );

    empty.setAttribute('x', String(width / 2));
    empty.setAttribute('y', String(height / 2));
    empty.setAttribute('text-anchor', 'middle');
    empty.setAttribute('fill', 'currentColor');
    empty.setAttribute('opacity', '0.55');
    empty.textContent =
      window.t('No analytics data available for this period.');

    svg.appendChild(empty);
    return;
  }

  const values = points.map(item =>
    Math.max(0, Number(item.events) || 0)
  );

  const rawMaxValue = Math.max(1, ...values);

  // Use a clean upper bound so the Y-axis has readable whole-number ticks.
  const magnitude = Math.pow(
    10,
    Math.floor(Math.log10(rawMaxValue))
  );
  const normalized = rawMaxValue / magnitude;
  const niceNormalized =
    normalized <= 1 ? 1 :
    normalized <= 2 ? 2 :
    normalized <= 5 ? 5 : 10;
  const yMax = niceNormalized * magnitude;
  const tickStep = yMax / 4;

  // Y-axis grid + numeric labels.
  for (let tickIndex = 0; tickIndex <= 4; tickIndex += 1) {
    const value = tickStep * tickIndex;
    const ratio = yMax === 0 ? 0 : value / yMax;
    const y = padTop + chartHeight - (chartHeight * ratio);

    const gridLine = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'line'
    );

    gridLine.setAttribute('x1', String(padLeft));
    gridLine.setAttribute('x2', String(width - padRight));
    gridLine.setAttribute('y1', String(y));
    gridLine.setAttribute('y2', String(y));
    gridLine.setAttribute('stroke', 'currentColor');
    gridLine.setAttribute(
      'opacity',
      tickIndex === 0 ? '0.18' : '0.07'
    );

    svg.appendChild(gridLine);

    const yLabel = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );

    yLabel.setAttribute('x', String(padLeft - 10));
    yLabel.setAttribute('y', String(y + 4));
    yLabel.setAttribute('text-anchor', 'end');
    yLabel.setAttribute('fill', 'currentColor');
    yLabel.setAttribute('opacity', '0.62');
    yLabel.setAttribute('font-size', '10');
    yLabel.textContent = formatAnalyticsNumber(value);

    svg.appendChild(yLabel);
  }

  const coords = values.map((value, index) => {
    const x = points.length === 1
      ? padLeft + (chartWidth / 2)
      : padLeft + (
          chartWidth * index / (points.length - 1)
        );

    const y =
      padTop
      + chartHeight
      - ((value / yMax) * chartHeight);

    return { x, y, value };
  });

  const linePath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );

  linePath.setAttribute(
    'd',
    coords
      .map((point, index) =>
        `${index === 0 ? 'M' : 'L'} `
        + `${point.x.toFixed(2)} ${point.y.toFixed(2)}`
      )
      .join(' ')
  );

  linePath.setAttribute('fill', 'none');
  linePath.setAttribute('stroke', 'currentColor');
  linePath.setAttribute('stroke-width', '3.5');
  linePath.setAttribute('stroke-linecap', 'round');
  linePath.setAttribute('stroke-linejoin', 'round');

  svg.appendChild(linePath);

  // Native SVG tooltip fallback.
  const tooltip = document.createElement('div');
  tooltip.id = 'analytics-activity-tooltip';
  tooltip.className = 'ck-analytics-activity-tooltip';
  tooltip.setAttribute('role', 'status');
  tooltip.setAttribute('aria-hidden', 'true');
  tooltip.style.display = 'none';

  if (wrap) {
    wrap.style.position = 'relative';
    wrap.appendChild(tooltip);
  }

  const showTooltip = (event, point, sourcePoint) => {
    if (!wrap) return;

    const wrapRect = wrap.getBoundingClientRect();
    const eventX = event.clientX - wrapRect.left;
    const eventY = event.clientY - wrapRect.top;

    tooltip.innerHTML = '';

    const dateLine = document.createElement('strong');
    dateLine.textContent = sourcePoint.date;

    const valueLine = document.createElement('span');
    valueLine.textContent = `${formatAnalyticsNumber(point.value)} ${window.t('Events').toLowerCase()}`;

    tooltip.appendChild(dateLine);
    tooltip.appendChild(valueLine);

    tooltip.style.display = 'flex';
    tooltip.setAttribute('aria-hidden', 'false');

    const maxLeft = Math.max(8, wrap.clientWidth - 150);
    const left = Math.min(
      Math.max(8, eventX + 12),
      maxLeft
    );
    const top = Math.max(8, eventY - 56);

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  };

  const hideTooltip = () => {
    tooltip.style.display = 'none';
    tooltip.setAttribute('aria-hidden', 'true');
  };

  coords.forEach((point, index) => {
    const group = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    );

    group.setAttribute('class', 'analytics-activity-point');
    group.setAttribute('tabindex', '0');
    group.setAttribute('role', 'img');
    group.setAttribute(
      'aria-label',
      `${points[index].date}: ${formatAnalyticsNumber(point.value)} ${window.t('Events').toLowerCase()}`
    );

    const hitArea = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    hitArea.setAttribute('cx', String(point.x));
    hitArea.setAttribute('cy', String(point.y));
    hitArea.setAttribute('r', '10');
    hitArea.setAttribute('fill', 'transparent');
    hitArea.setAttribute('pointer-events', 'all');
    hitArea.style.cursor = 'pointer';

    const circle = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    circle.setAttribute('cx', String(point.x));
    circle.setAttribute('cy', String(point.y));
    circle.setAttribute('r', '4');
    circle.setAttribute('fill', 'currentColor');
    circle.setAttribute('pointer-events', 'none');

    const title = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'title'
    );

    title.textContent =
      `${points[index].date}: `
      + `${formatAnalyticsNumber(point.value)} ${window.t('Events').toLowerCase()}`;

    circle.appendChild(title);

    group.appendChild(hitArea);
    group.appendChild(circle);

    // Show values directly on the chart for the common short ranges.
    // For longer ranges, keep the chart clean and rely on hover/focus.
    if (points.length <= 14 || index === 0 || index === points.length - 1) {
      const valueLabel = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      );

      valueLabel.setAttribute('x', String(point.x));
      valueLabel.setAttribute(
        'y',
        String(Math.max(13, point.y - 9))
      );
      valueLabel.setAttribute('text-anchor', 'middle');
      valueLabel.setAttribute('fill', 'currentColor');
      valueLabel.setAttribute('opacity', '0.82');
      valueLabel.setAttribute('font-size', '10');
      valueLabel.setAttribute('font-weight', '700');
      valueLabel.textContent = formatAnalyticsNumber(point.value);

      group.appendChild(valueLabel);
    }

    hitArea.addEventListener('mouseenter', event =>
      showTooltip(event, point, points[index])
    );
    hitArea.addEventListener('mousemove', event =>
      showTooltip(event, point, points[index])
    );
    hitArea.addEventListener('mouseleave', hideTooltip);
    hitArea.addEventListener('focus', event =>
      showTooltip(event, point, points[index])
    );
    hitArea.addEventListener('blur', hideTooltip);

    svg.appendChild(group);
  });

  const labelIndexes = new Set([
    0,
    Math.floor((points.length - 1) / 2),
    points.length - 1
  ]);

  labelIndexes.forEach(index => {
    const label = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'text'
    );

    label.setAttribute(
      'x',
      String(coords[index].x)
    );

    label.setAttribute(
      'y',
      String(height - 12)
    );

    label.setAttribute(
      'text-anchor',
      index === 0
        ? 'start'
        : index === points.length - 1
          ? 'end'
          : 'middle'
    );

    label.setAttribute('fill', 'currentColor');
    label.setAttribute('opacity', '0.6');
    label.setAttribute('font-size', '11');
    label.textContent = points[index].date;

    svg.appendChild(label);
  });
}

function renderAnalyticsFeatures(features = {}) {
  const container =
    document.getElementById('analytics-feature-list');

  if (!container) return;

  container.innerHTML = '';

  const entries =
    Object.entries(features || {})
      .filter(([feature, data]) =>
        feature
        && data
        && Number.isFinite(Number(data.usageRate))
      )
      .filter(([feature]) =>
        feature !== 'dashboard'
        && feature !== 'inherited_vault'
      )
      .sort(
        (a, b) =>
          Number(b[1].usageRate)
          - Number(a[1].usageRate)
      );

  if (!entries.length) {
    const empty =
      document.createElement('p');

    empty.className =
      'ck-analytics-status';

    empty.textContent =
      window.t('No analytics data available for this period.');

    container.appendChild(empty);
    return;
  }

  entries.forEach(([feature, data]) => {
    const rate = Math.min(
      100,
      Math.max(
        0,
        Math.round(Number(data.usageRate) || 0)
      )
    );

    const row = document.createElement('div');
    row.className = 'ck-analytics-feature-row';

    const name = document.createElement('div');
    name.className = 'ck-analytics-feature-name';
    name.textContent = getAnalyticsFeatureLabel(feature);

    const track = document.createElement('div');
    track.className = 'ck-analytics-bar-track';

    const fill = document.createElement('div');
    fill.className = 'ck-analytics-bar-fill';
    fill.style.width = `${rate}%`;

    track.appendChild(fill);

    const value = document.createElement('div');
    value.className = 'ck-analytics-feature-value';
    value.textContent = `${rate}%`;

    row.appendChild(name);
    row.appendChild(track);
    row.appendChild(value);

    container.appendChild(row);
  });
}

function getAnalyticsEventLabel(eventName) {
  // Analytics event key -> exact translation key.
  // UI-only change: tracking/storage logic is untouched.
  const labels = {
    login_started: 'Login Started',
    login_success: 'Login Success',
    login_failed: 'Login Failed',
    login_unverified: 'Login Unverified',

    signup_started: 'Signup Started',
    signup_success: 'Signup Success',
    signup_failed: 'Signup Failed',

    credential_created: 'Credential Created',
    credential_viewed: 'Credential Viewed',
    credential_updated: 'Credential Updated',
    credential_update_failed: 'Credential Update Failed',
    credential_create_failed: 'Credential Create Failed',
    credential_deleted: 'Credential Deleted',
    credential_delete_failed: 'Credential Delete Failed',
    credential_archived: 'Credential Archived',
    credential_archive_failed: 'Credential Archive Failed',
    credential_restored: 'Credential Restored',
    credential_restore_failed: 'Credential Restore Failed',
    credential_password_copied: 'Credential Password Copied',

    search_performed: 'Search Performed',
    search_view: 'Search View',

    feature_view: 'Feature View',
    feature_exit: 'Feature Exit',

    inheritance_invitation_sent: 'Inheritance Invitation Sent',
    inheritance_invitation_accepted: 'Inheritance Invitation Accepted',
    inheritance_invitation_declined: 'Inheritance Invitation Declined',
    inheritance_revoked: 'Inheritance Revoked',

    inherited_vault_access_started: 'Inherited Vault Access Started',
    inherited_vault_access_success: 'Inherited Vault Access Success',
    inherited_vault_access_failed: 'Inherited Vault Access Failed',
    inherited_vault_exit: 'Inherited Vault Exit',

    recovery_started: 'Recovery Started',
    recovery_verified: 'Recovery Verified',
    recovery_setup_started: 'Recovery Setup Started',
    recovery_setup_success: 'Recovery Setup Success',
    recovery_setup_failed: 'Recovery Setup Failed',
    recovery_success: 'Recovery Success',
    recovery_password_reset_failed: 'Recovery Password Reset Failed',

    vault_unlock_started: 'Vault Unlock Started',
    vault_unlock_success: 'Vault Unlock Success',
    vault_unlock_failed: 'Vault Unlock Failed',

    analytics_test: 'Analytics Test',

    logout: 'Logout',

    session_start: 'Session Start',
    session_end: 'Session End'
  };

  const labelKey = labels[eventName];

  return labelKey
    ? window.t(labelKey)
    : String(eventName)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase());
}

function renderAnalyticsEvents(eventCounts = {}, totalEvents = 0) {
  const container =
    document.getElementById('analytics-event-list');

  if (!container) return;

  container.innerHTML = '';

  const entries =
    Object.entries(eventCounts || {})
      .filter(([eventName, count]) =>
        eventName
        && Number.isFinite(Number(count))
        && Number(count) > 0
      )
      .sort(
        (a, b) =>
          Number(b[1]) - Number(a[1])
      );

  if (!entries.length) {
    const empty =
      document.createElement('p');

    empty.className =
      'ck-analytics-status';

    empty.textContent =
      window.t('No analytics data available for this period.');

    container.appendChild(empty);
    return;
  }

  const total =
    Math.max(
      0,
      Number(totalEvents) || 0
    );

  entries.forEach(([eventName, count]) => {
    const eventCount =
      Math.max(
        0,
        Number(count) || 0
      );

    const rate =
      total > 0
        ? Math.round(
            (eventCount / total) * 100
          )
        : 0;

    const row =
      document.createElement('div');

    row.className =
      'ck-analytics-event-row';

    const name =
      document.createElement('div');

    name.className =
      'ck-analytics-event-name';

    name.textContent =
      getAnalyticsEventLabel(eventName);

    const track =
      document.createElement('div');

    track.className =
      'ck-analytics-bar-track';

    const fill =
      document.createElement('div');

    fill.className =
      'ck-analytics-bar-fill';

    fill.style.width =
      `${Math.min(100, rate)}%`;

    track.appendChild(fill);

    const value =
      document.createElement('div');

    value.className =
      'ck-analytics-event-value';

    value.textContent =
      `${formatAnalyticsNumber(eventCount)} · ${rate}%`;

    row.appendChild(name);
    row.appendChild(track);
    row.appendChild(value);

    container.appendChild(row);
  });
}

function renderAnalyticsDashboard(response) {
  if (!response?.summary) return;

  analyticsDashboardData = response;

  const summary = response.summary;

  const users =
    document.getElementById('analytics-users');

  const sessions =
    document.getElementById('analytics-sessions');

  const events =
    document.getElementById('analytics-events');

  const activeUsers =
    document.getElementById('analytics-active-users');

  const rangeText =
    document.getElementById('analytics-date-range');

  if (users) {
    users.textContent =
      formatAnalyticsNumber(summary.uniqueVisitors);
  }

  if (sessions) {
    sessions.textContent =
      formatAnalyticsNumber(summary.uniqueSessions);
  }

  if (events) {
    events.textContent =
      formatAnalyticsNumber(summary.totalEvents);
  }

  if (activeUsers) {
    activeUsers.textContent =
      formatAnalyticsNumber(summary.activeUsers);
  }

  renderAnalyticsActivity(summary.activity || []);
  renderAnalyticsFeatures(summary.features || {});
  renderAnalyticsEvents(
    summary.eventCounts || {},
    summary.totalEvents || 0
  );

  if (rangeText && response.range) {
    if (response.range.days === null) {
      rangeText.textContent = window.t('All Time');
    } else if (response.range.days === 7) {
      rangeText.textContent = window.t('Last 7 Days');
    } else if (response.range.days === 30) {
      rangeText.textContent = window.t('Last 30 Days');
    } else {
      rangeText.textContent = `${response.range.days} days`;
    }
  }

  document
    .getElementById('analytics-loading')
    ?.classList.add('hidden');

  document
    .getElementById('analytics-error')
    ?.classList.add('hidden');

  document
    .getElementById('analytics-content')
    ?.classList.remove('hidden');
}

async function loadAnalyticsDashboard(days = 7) {
  if (!analyticsDashboardInitialized) {
    ensureAnalyticsDashboardUI();
  }

  if (!analyticsDashboardAdmin) {
    const allowed =
      await checkAnalyticsAdminAccess();

    if (!allowed) return;
  }

  const requestId =
    ++analyticsDashboardRequestId;

  const loading =
    document.getElementById('analytics-loading');

  const error =
    document.getElementById('analytics-error');

  const content =
    document.getElementById('analytics-content');

  loading?.classList.remove('hidden');
  error?.classList.add('hidden');
  content?.classList.add('hidden');

  try {
    const response =
      await fetchVercelAPI(
        `analytics-summary?days=${encodeURIComponent(days)}`
      );

    if (requestId !== analyticsDashboardRequestId) return;

    if (!response?.success || !response?.summary) {
      throw new Error(
        window.t('Unable to load analytics data.')
      );
    }

    analyticsDashboardAdmin = true;
    renderAnalyticsDashboard(response);
  } catch (err) {
    if (requestId !== analyticsDashboardRequestId) return;

    loading?.classList.add('hidden');
    content?.classList.add('hidden');

    if (error) {
      error.textContent =
        err?.message
        || window.t('Unable to load analytics data.');

      error.classList.remove('hidden');
    }

    console.error(
      '[Analytics Dashboard] Load failed:',
      err
    );
  }
}

async function initializeAnalyticsDashboard() {
  ensureAnalyticsDashboardUI();

  if (!analyticsDashboardInitialized) return;

  await checkAnalyticsAdminAccess();
}

// ==========================================
// FOLDERS PAGE — SEPARATE FROM MY CREDENTIALS
// ==========================================
function ensureFoldersPageUI() {
  const app = getCheckKeyApp();
  if (!app) return;

  // Add a dedicated Folders item directly below My Credentials.
  if (!document.getElementById('nav-folders')) {
    const credentialsNav = document.getElementById('nav-credentials');
    if (credentialsNav) {
      const li = credentialsNav.closest('li') || credentialsNav.parentElement;
      const folderLi = document.createElement('li');
      folderLi.className = '';
      folderLi.id = 'nav-folders';
      folderLi.innerHTML = `
        <a href="#" class="nav-item" id="nav-folders-link">
          <span>${window.t('Folders')}</span>
        </a>
      `;
      if (li?.parentElement) li.parentElement.insertBefore(folderLi, li.nextSibling);
    }
  }

  // Add the dedicated Folders view once.
  if (!document.getElementById('view-folders')) {
    const dashboardContent = app.querySelector('.dashboard-content');
    if (dashboardContent) {
      const foldersHtml = `
        <div id="view-folders" class="dashboard-view view-wide">
          <div class="view-card">
            <div class="flex-between align-center border-bottom pb-3 mb-3">
              <div>
                <h3 class="mb-1" data-i18n="Folders">${window.t('Folders')}</h3>
                <p class="text-muted mb-0" data-i18n="Manage your folders">
                  ${window.t('Manage your folders')}
                </p>
              </div>
              <button type="button" class="btn-primary btn-auto" id="folders-page-create">
                + ${window.t('New Folder')}
              </button>
            </div>

            <p class="text-muted mb-3" style="font-size: 14px;" data-i18n="Organize your credentials into folders. Deleting a folder will not delete its credentials.">
              ${window.t('Organize your credentials into folders. Deleting a folder will not delete its credentials.')}
            </p>

            <div id="folders-page-list" class="folders-page-list"></div>

            <div class="empty-state hidden" id="folders-page-empty">
              <h4 data-i18n="No folders yet">${window.t('No folders yet')}</h4>
              <p data-i18n="Create your first folder to organize your credentials.">
                ${window.t('Create your first folder to organize your credentials.')}
              </p>
            </div>
          </div>
        </div>

        <div id="view-folder-detail" class="dashboard-view view-wide">
          <a href="#" class="back-link" id="folder-detail-back">${window.t('← Back to Folder')}</a>
          <div class="view-card mt-3">
            <div class="flex-between align-center border-bottom pb-3 mb-3">
              <div>
                <h3 class="mb-1" id="folder-detail-title">${window.t('Folders')}</h3>
                <p class="text-muted mb-0" id="folder-detail-subtitle">${window.t('No credentials here')}</p>
              </div>
              <button type="button" class="btn-primary btn-auto" id="folder-detail-add">${window.t('Add Existing Credential')}</button>
            </div>

            <div id="folder-detail-list" class="folder-detail-list"></div>

            <div class="empty-state hidden" id="folder-detail-empty">
              <h4 data-i18n="No credentials here">${window.t('No credentials here')}</h4>
            </div>
          </div>
        </div>
      `;
      dashboardContent.insertAdjacentHTML('beforeend', foldersHtml);
    }
  }

  const navFolders = document.getElementById('nav-folders');
  if (navFolders && navFolders.dataset.bound !== 'true') {
    navFolders.dataset.bound = 'true';
    navFolders.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboardView('view-folders');
    });
  }

  const folderDetailBack = document.getElementById('folder-detail-back');
  if (folderDetailBack && folderDetailBack.dataset.bound !== 'true') {
    folderDetailBack.dataset.bound = 'true';
    folderDetailBack.addEventListener('click', (e) => {
      e.preventDefault();
      core2CurrentFolderId = null;
      showDashboardView('view-folders');
    });
  }

  const folderDetailAdd = document.getElementById('folder-detail-add');
  if (folderDetailAdd && folderDetailAdd.dataset.bound !== 'true') {
    folderDetailAdd.dataset.bound = 'true';
    folderDetailAdd.addEventListener('click', () => {
      openAddExistingCredentialModal();
    });
  }

  const createButton = document.getElementById('folders-page-create');
  if (createButton && createButton.dataset.bound !== 'true') {
    createButton.dataset.bound = 'true';
    createButton.addEventListener('click', () => {
      if (currentRole === 'inheritor') {
        appShowToast(window.t('VIEW ONLY access. Cannot create folders.'));
        return;
      }
      const nameInput = document.getElementById('input-folder-name');
      const errorEl = document.getElementById('err-folder-name');
      if (nameInput) nameInput.value = '';
      if (errorEl) errorEl.textContent = '';
      document.getElementById('modal-core2-create-folder')?.classList.remove('hidden');
    });
  }

  renderFoldersPage();
}

function renderFoldersPage() {
  const list = document.getElementById('folders-page-list');
  const empty = document.getElementById('folders-page-empty');
  if (!list || !empty) return;

  const folders = Array.isArray(core2Folders) ? core2Folders : [];
  empty.classList.toggle('hidden', folders.length !== 0);
  list.classList.toggle('hidden', folders.length === 0);

  list.innerHTML = folders.map(folder => {
    const count = core2Credentials.filter(c => c.folderId === folder.id).length;
    return `
      <div class="folder-management-card" data-folder-id="${appEscape(folder.id)}">
        <div class="folder-management-main">
          <div class="folder-management-icon" aria-hidden="true">📁</div>
          <div class="folder-management-details">
            <h4 class="mb-1">${appEscape(folder.name)}</h4>
            <p class="text-muted mb-0 folder-credential-count">
              ${count} ${window.t('credentials')}
            </p>
          </div>
        </div>
        <div class="folder-management-actions">
          <button type="button" class="btn-primary btn-auto folder-view-button" data-folder-view="${appEscape(folder.id)}">
            ${window.t('View')}
          </button>
          <button type="button" class="btn-secondary btn-auto folder-delete-button" data-folder-delete="${appEscape(folder.id)}">
            ${window.t('Delete Folder')}
          </button>
        </div>
      </div>
    `;
  }).join('');

  list.querySelectorAll('[data-folder-view]').forEach(button => {
    button.addEventListener('click', () => {
      const folderId = button.dataset.folderView;
      const folder = core2Folders.find(item => item.id === folderId);
      if (!folder) {
        appShowToast(window.t('Folder not found.'));
        return;
      }

      core2CurrentFolderId = folderId;
      renderFolderDetailPage();
      showDashboardView('view-folder-detail');
    });
  });

  list.querySelectorAll('[data-folder-delete]').forEach(button => {
    button.addEventListener('click', async () => {
      if (currentRole === 'inheritor') {
        appShowToast(window.t('VIEW ONLY access. Cannot delete folders.'));
        return;
      }

      const folderId = button.dataset.folderDelete;
      const folder = core2Folders.find(item => item.id === folderId);
      if (!folder) {
        appShowToast(window.t('Folder not found.'));
        return;
      }

      const confirmed = window.confirm(
        window.t('Delete this folder? Credentials inside it will be moved to Unfiled and will not be deleted.')
      );
      if (!confirmed) return;

      button.disabled = true;
      try {
        await deleteFolder(folderId);
        renderFoldersPage();
        appShowToast(window.t('Folder deleted successfully.'));
      } catch (error) {
        console.error('[Folder] Failed to delete folder:', error);
        appShowToast(error?.message || window.t('Unable to delete folder. Please try again.'));
      } finally {
        button.disabled = false;
      }
    });
  });
}


// Folder existing-credential labels fallback.
// Keeps the new folder flow usable in both languages when a dictionary key is absent.
(function ensureFolderExistingCredentialTranslations() {
  if (typeof window.t !== 'function' || window.__folderExistingCredentialTWrapped) return;

  const originalT = window.t;
  const fallback = {
    'Add Existing Credential': { en: 'Add Existing Credential', vi: 'Thêm credential đã có' },
    'Select credentials you have already created to add them to this folder.': {
      en: 'Select credentials you have already created to add them to this folder.',
      vi: 'Chọn các credential đã tạo để thêm vào folder này.'
    },
    'All existing credentials are already in this folder.': {
      en: 'All existing credentials are already in this folder.',
      vi: 'Tất cả credential hiện có đã nằm trong folder này.'
    },
    'Add Selected': { en: 'Add Selected', vi: 'Thêm đã chọn' },
    'Select at least one credential.': { en: 'Select at least one credential.', vi: 'Chọn ít nhất một credential.' },
    'Adding...': { en: 'Adding...', vi: 'Đang thêm...' },
    'Credential added to folder.': { en: 'Credential added to folder.', vi: 'Đã thêm credential vào folder.' },
    'Credentials added to folder.': { en: 'Credentials added to folder.', vi: 'Đã thêm các credential vào folder.' },
    'Failed to add credentials to folder.': {
      en: 'Failed to add credentials to folder.',
      vi: 'Không thể thêm credential vào folder.'
    },
    '← Back to Folder': { en: '← Back to Folder', vi: '← Quay lại Folder' }
  };

  window.t = function(key, vars) {
    const result = originalT(key, vars);
    if (result === key && fallback[key]) {
      const lang = localStorage.getItem('app_lang') || localStorage.getItem('checkkey-language') || 'en';
      return fallback[key][lang] || fallback[key].en;
    }
    return result;
  };

  window.__folderExistingCredentialTWrapped = true;
})();


function ensureAddExistingCredentialModal() {
  if (document.getElementById('modal-add-existing-credential')) return;

  const modalHtml = `
    <div id="modal-add-existing-credential" class="modal-overlay hidden" style="z-index: 1000000;">
      <div class="modal-content" style="max-width: 620px; width: calc(100% - 32px);">
        <div class="flex-between align-center mb-3">
          <div>
            <h3 class="mb-1">${window.t('Add Existing Credential')}</h3>
            <p class="text-muted mb-0">${window.t('Select credentials you have already created to add them to this folder.')}</p>
          </div>
          <button type="button" class="btn-secondary btn-auto" id="btn-close-add-existing-credential">
            ${window.t('Cancel')}
          </button>
        </div>

        <div id="add-existing-credential-list" class="folder-existing-credential-list" style="max-height: 360px; overflow-y: auto; padding-right: 4px;"></div>

        <p id="add-existing-credential-empty" class="empty-state hidden" style="margin: 0;">
          ${window.t('All existing credentials are already in this folder.')}
        </p>

        <div class="flex-end gap-10 mt-3">
          <button type="button" class="btn-secondary btn-auto" id="btn-cancel-add-existing-credential">
            ${window.t('Cancel')}
          </button>
          <button type="button" class="btn-primary btn-auto" id="btn-save-existing-credentials">
            ${window.t('Add Selected')}
          </button>
        </div>
        <p id="err-add-existing-credential" class="error-message mt-2"></p>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const closeModal = () => {
    document.getElementById('modal-add-existing-credential')?.classList.add('hidden');
  };

  document.getElementById('btn-close-add-existing-credential')?.addEventListener('click', closeModal);
  document.getElementById('btn-cancel-add-existing-credential')?.addEventListener('click', closeModal);

  document.getElementById('btn-save-existing-credentials')?.addEventListener('click', async () => {
    await addSelectedExistingCredentialsToFolder();
  });
}

function openAddExistingCredentialModal() {
  if (currentRole === 'inheritor') {
    appShowToast(window.t('VIEW ONLY access. Cannot add credentials.'));
    return;
  }

  if (!core2CurrentFolderId) {
    appShowToast(window.t('Folder not found.'));
    return;
  }

  ensureAddExistingCredentialModal();

  const folder = core2Folders.find(item => item.id === core2CurrentFolderId);
  if (!folder) {
    appShowToast(window.t('Folder not found.'));
    return;
  }

  const available = core2Credentials
    .filter(c => c.archived !== true)
    .filter(c => c.folderId !== folder.id);

  const list = document.getElementById('add-existing-credential-list');
  const empty = document.getElementById('add-existing-credential-empty');
  const error = document.getElementById('err-add-existing-credential');
  const saveButton = document.getElementById('btn-save-existing-credentials');
  const modal = document.getElementById('modal-add-existing-credential');

  if (!list || !empty || !modal) return;

  error.textContent = '';
  saveButton.disabled = available.length === 0;
  empty.classList.toggle('hidden', available.length !== 0);
  list.classList.toggle('hidden', available.length === 0);

  list.innerHTML = available.map(c => `
    <label class="folder-existing-credential-item" style="display:flex; align-items:center; gap:12px; padding:12px 14px; border:1px solid var(--border-color); border-radius:8px; margin-bottom:8px; cursor:pointer; background:#fff;">
      <input type="checkbox" class="folder-existing-credential-checkbox" value="${appEscape(c.id)}" style="width:18px; height:18px; flex:0 0 auto;">
      <span style="flex:1; min-width:0;">
        <strong style="display:block; color:var(--text-main);">${appEscape(c.platform)}</strong>
        <span class="text-muted" style="display:block; margin-top:3px;">${appEscape(c.username)}</span>
      </span>
      <span class="text-muted" style="font-size:13px;">${appEscape(translateCategory(c.category))}</span>
    </label>
  `).join('');

  modal.classList.remove('hidden');
}

async function addSelectedExistingCredentialsToFolder() {
  if (currentRole === 'inheritor') {
    appShowToast(window.t('VIEW ONLY access. Cannot add credentials.'));
    return;
  }

  const folderId = core2CurrentFolderId;
  const folder = core2Folders.find(item => item.id === folderId);
  if (!folder) {
    appShowToast(window.t('Folder not found.'));
    return;
  }

  const selectedIds = Array.from(
    document.querySelectorAll('.folder-existing-credential-checkbox:checked')
  ).map(input => input.value);

  const error = document.getElementById('err-add-existing-credential');
  const saveButton = document.getElementById('btn-save-existing-credentials');

  if (!selectedIds.length) {
    if (error) error.textContent = window.t('Select at least one credential.');
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = window.t('Adding...');

  try {
    for (const id of selectedIds) {
      const credential = core2Credentials.find(item => item.id === id);
      if (!credential) continue;

      await updateCredential(id, {
        platform: credential.platform,
        username: credential.username,
        password: credential.password,
        website: credential.website || '',
        category: credential.category,
        categoryGroup: credential.categoryGroup || credential.category,
        notes: credential.notes || '',
        folderId: folderId,
        inheritEnabled: credential.inheritEnabled === true
      });
    }

    document.getElementById('modal-add-existing-credential')?.classList.add('hidden');

    renderFolderDetailPage();
    renderFoldersPage();

    appShowToast(
      selectedIds.length === 1
        ? window.t('Credential added to folder.')
        : window.t('Credentials added to folder.')
    );
  } catch (err) {
    console.error('[Folder] Failed to add existing credentials:', err);
    if (error) error.textContent = err?.message || window.t('Failed to add credentials to folder.');
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = window.t('Add Selected');
  }
}

function renderFolderDetailPage() {
  const title = document.getElementById('folder-detail-title');
  const subtitle = document.getElementById('folder-detail-subtitle');
  const list = document.getElementById('folder-detail-list');
  const empty = document.getElementById('folder-detail-empty');
  if (!title || !subtitle || !list || !empty) return;

  const folder = core2Folders.find(item => item.id === core2CurrentFolderId);
  if (!folder) {
    core2CurrentFolderId = null;
    showDashboardView('view-folders');
    return;
  }

  const credentials = core2Credentials
    .filter(c => c.folderId === folder.id)
    .filter(c => c.archived !== true);

  title.textContent = folder.name;
  subtitle.textContent = credentials.length === 1
    ? window.t('1 credential')
    : window.t('{{count}} credentials', { count: credentials.length });

  empty.classList.toggle('hidden', credentials.length !== 0);
  list.classList.toggle('hidden', credentials.length === 0);

  // Match the My Credentials table layout.
  list.innerHTML = `
    <div class="table-wrap folder-detail-table-wrap">
      <table class="data-table folder-detail-table">
        <thead>
          <tr>
            <th>${window.t('Platform')}</th>
            <th>${window.t('Username or email')}</th>
            <th>${window.t('Category')}</th>
            <th class="text-right">${window.t('Action')}</th>
          </tr>
        </thead>
        <tbody>
          ${credentials.map(c => `
            <tr>
              <td>${appEscape(c.platform)}</td>
              <td>${appEscape(c.username)}</td>
              <td>${appEscape(translateCategory(c.category))}</td>
              <td class="text-right">
                <button type="button" class="btn-primary btn-auto" style="min-height: 32px; padding: 6px 12px; font-size: 13px;" data-folder-credential-view="${appEscape(c.id)}">
                  ${window.t('View')}
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  list.querySelectorAll('[data-folder-credential-view]').forEach(button => {
    button.addEventListener('click', () => {
      core2ViewCredential(button.dataset.folderCredentialView);
    });
  });
}

function removeFolderControlsFromCredentialsPage() {
  // My Credentials should contain credential management only.
  document.getElementById('core2-select-folder-filter')?.closest('.filter-group, .form-group')?.remove();
  document.getElementById('core2-select-folder-filter')?.remove();
  document.getElementById('core2-btn-create-folder')?.remove();
  document.getElementById('core2-btn-delete-folder')?.remove();
}

// ==========================================
// INITIALIZATION & EVENT LISTENERS
// ==========================================
function initializeUI() {

  // STEP 5.2: Add Analytics UI without changing existing screens.
  ensureAnalyticsDashboardUI();

  // INJECT LOCKOUT MODAL HTML
  const lockoutModalHtml = `
  <div id="lockoutModal" class="modal hidden" style="display: none; z-index: 999999; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <div class="modal-content" style="background: #ffffff; padding: 30px; border-radius: 8px; text-align: center; border: 2px solid #000000; min-width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);">
       <h2 style="color: #d32f2f; margin-bottom: 15px; font-weight: bold; font-size: 22px;">${window.t('Account Locked')}</h2>
       <p style="margin-bottom: 15px; font-size: 15px; color: #333333;">${window.t('Too many failed login attempts.')}</p>
       <p style="margin-bottom: 5px; font-size: 13px; color: #666666;">${window.t('Try again in:')}</p>
       <div id="lockoutCountdown" style="font-family: monospace; font-size: 2.5rem; letter-spacing: 2px; margin-bottom: 20px; color: #000000;">24:00:00</div>
       <button type="button" id="btn-close-lockout" style="padding: 10px 20px; background: #ffffff; color: #000000; border: 1px solid #000000; border-radius: 5px; cursor: pointer; font-size: 14px; font-weight: bold; transition: 0.2s;">${window.t('Use another account')}</button>
    </div>
  </div>
  `;
  
  if (!document.getElementById('lockoutModal')) {
      document.body.insertAdjacentHTML('beforeend', lockoutModalHtml);
      
      const btnClose = document.getElementById('btn-close-lockout');
      btnClose.addEventListener('mouseover', () => btnClose.style.background = '#f0f0f0');
      btnClose.addEventListener('mouseout', () => btnClose.style.background = '#ffffff');

      btnClose.addEventListener('click', () => {
          document.getElementById('lockoutModal').style.display = 'none';
          document.getElementById('lockoutModal').classList.add('hidden');
          
          document.getElementById('login-email').value = '';
          document.getElementById('login-master-pwd').value = '';
          
          document.getElementById('login-master-pwd').disabled = false;
          const btn = document.querySelector('#form-login button[type="submit"]');
          if (btn) {
              btn.disabled = false;
              btn.textContent = window.t('Log in');
          }
          
          document.getElementById('err-login-master-pwd').textContent = '';
          
          if (window.lockoutTimerInterval) {
              clearInterval(window.lockoutTimerInterval);
              window.lockoutTimerInterval = null;
          }
          manualLoginInProgress = false;
      });
  }

  // ==========================================
  // INJECT INHERITANCE TOGGLE INTO CREDENTIAL FORM
  // ==========================================
  const credForm = document.getElementById('core2-credential-form');
  if (credForm && !document.getElementById('core2-input-inheritable-wrapper')) {
      const notesInput = document.getElementById('core2-input-notes');
      if (notesInput) {
          const wrapper = notesInput.closest('.form-group') || notesInput;
          const inheritableHtml = `
              <div class="form-group" id="core2-input-inheritable-wrapper" style="margin-top: 15px; padding: 15px; border: 1px solid #e0e0e0; border-radius: 6px; background: #fafafa;">
                  <label style="display: flex; align-items: center; cursor: pointer; margin: 0; font-weight: 600; color: #333;">
                      <input type="checkbox" id="core2-input-inheritable" style="margin-right: 12px; width: 18px; height: 18px; cursor: pointer;">
                      <span data-i18n="Include this credential in Emergency Access">${window.t('Include this credential in Emergency Access')}</span>
                  </label>
                  <small style="display: block; margin-top: 6px; color: #666; margin-left: 30px;" data-i18n="If checked, your designated inheritor will be able to view this credential.">${window.t('If checked, your designated inheritor will be able to view this credential.')}</small>
              </div>
          `;
          wrapper.insertAdjacentHTML('afterend', inheritableHtml);
      }
  }

  document.getElementById('link-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('screen-login');
  });

  document.getElementById('link-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('screen-create-account');
  });

  document.getElementById('btn-back-to-login').addEventListener('click', () => {
    showScreen('screen-login');
  });

  document.getElementById('form-signup').addEventListener('submit', handleSignUp);
  document.getElementById('form-login').addEventListener('submit', handleLogin);
  document.getElementById('form-vault-unlock').addEventListener('submit', handleVaultUnlock);
  document.getElementById('btn-vault-logout').addEventListener('click', handleLogout);
  document.getElementById('btn-pending-logout').addEventListener('click', handleLogout);
  document.getElementById('btn-error-logout').addEventListener('click', handleLogout);
  
  document.getElementById('btn-retry-account-status').addEventListener('click', async () => {
    const btn = document.getElementById('btn-retry-account-status');
    btn.disabled = true;
    btn.textContent = window.t('Retrying...');
    try {
      const user = auth.currentUser;
      if (!user) {
        handleLogoutUI();
        return;
      }
      const delData = await fetchVercelAPI('account-deletion', 'GET');
      if (delData.pending) {
        renderPendingDeletionScreen(delData);
      } else {
        showScreen('screen-vault-locked');
      }
    } catch(err) {
      console.error("Retry failed:", err.message || err);
    } finally {
      btn.disabled = false;
      btn.textContent = window.t('Try Again');
    }
  });

  const inheritedHtml = `
    <div id="view-inherited-vault" class="dashboard-view view-wide">
      <div class="view-card">
        <div class="flex-between align-center border-bottom pb-3 mb-3">
          <div>
            <h3 class="mb-1" data-i18n="Inherited Vault">${window.t('Inherited Vault')}</h3>
            <p class="text-muted mb-1" id="inherited-vault-owner-email">${window.t('Owner: ')}</p>
            <p class="text-muted mb-0" style="font-size: 14px;" data-i18n="Access: View only">${window.t('Access: View only')}</p>
          </div>
          <button type="button" class="btn-primary btn-auto" id="btn-exit-inherited-vault-2" style="background-color: #f0ad4e; border-color: #eea236; color: white;" data-i18n="Exit Inherited View">${window.t('Exit Inherited View')}</button>
        </div>
        <div class="flex-between align-center mt-3">
          <div>
            <h4 class="mb-0" data-i18n="Credentials">${window.t('Credentials')}</h4>
            <span class="count-badge" id="inherited-credential-count">${window.t('0 credentials')}</span>
          </div>
          <div class="flex-end gap-10 actions-wrapper">
            <select id="inherited-select-sort" class="filter-select" aria-label="Sort credentials" data-i18n-label="Sort credentials">
              <option value="updated-desc" selected data-i18n="Recently updated">${window.t('Recently updated')}</option>
              <option value="updated-asc" data-i18n="Oldest updated">${window.t('Oldest updated')}</option>
              <option value="name-asc" data-i18n="Name A–Z">${window.t('Name A–Z')}</option>
              <option value="name-desc" data-i18n="Name Z–A">${window.t('Name Z–A')}</option>
            </select>
            <select id="inherited-select-folder-filter" class="filter-select" aria-label="Filter by folder" data-i18n-label="Filter by folder">
              <option value="all" data-i18n="All Folders">${window.t('All Folders')}</option>
              <option value="" data-i18n="Unfiled">${window.t('Unfiled')}</option>
            </select>
            <select id="inherited-select-status" class="filter-select" aria-label="Filter by status" data-i18n-label="Filter by status">
              <option value="active" selected data-i18n="Active">${window.t('Active')}</option>
              <option value="archived" data-i18n="Archived">${window.t('Archived')}</option>
              <option value="all" data-i18n="All">${window.t('All')}</option>
            </select>
          </div>
        </div>
        <div class="table-wrap mt-3">
          <table class="data-table">
            <thead>
              <tr>
                <th data-i18n="Platform">${window.t('Platform')}</th>
                <th data-i18n="Username or email">${window.t('Username or email')}</th>
                <th data-i18n="Category">${window.t('Category')}</th>
                <th class="text-right" data-i18n="Action">${window.t('Action')}</th>
              </tr>
            </thead>
            <tbody id="inherited-credentials-body"></tbody>
          </table>
        </div>
        <div class="empty-state hidden" id="inherited-empty-state">
          <h4 data-i18n="No credentials found">${window.t('No credentials found')}</h4>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.dashboard-content').insertAdjacentHTML('beforeend', inheritedHtml);
  document.getElementById('inherited-select-sort').addEventListener('change', renderInheritedCredentialList);
  document.getElementById('inherited-select-folder-filter').addEventListener('change', renderInheritedCredentialList);
  document.getElementById('inherited-select-status').addEventListener('change', renderInheritedCredentialList);
  document.getElementById('btn-exit-inherited-vault-2').addEventListener('click', exitInheritedVault);

  ensureFoldersPageUI();
  removeFolderControlsFromCredentialsPage();

  document.getElementById('nav-dashboard').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-dashboard'); });
  document.getElementById('nav-credentials').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-core2-list'); });
  document.getElementById('nav-search').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-core3-search'); });
  document.getElementById('nav-inheritance').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-emergency-access'); });
  document.getElementById('nav-security').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-change-pwd'); });
  document.getElementById('nav-devices')?.addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-devices-access'); });
  document.getElementById('btn-sign-out-all-devices')?.addEventListener('click', signOutAllOtherDevices);

  document.getElementById('btn-logout').addEventListener('click', handleLogout);
  document.getElementById('btn-login-again').addEventListener('click', handleLogout);

  document.getElementById('btn-modal-login-again').addEventListener('click', () => {
    document.getElementById('modal-session-expired').classList.add('hidden');
    sessionExpiredByInactivity = false;
    showScreen('screen-login');
    document.getElementById('login-email').focus();
  });

  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', togglePasswordVisibility);
  });

  const regInputs = ['reg-email', 'reg-master-pwd', 'reg-confirm-pwd', 'reg-sec-question', 'reg-sec-answer'];
  regInputs.forEach(id => {
    const el = document.getElementById(id);
    if(el) {
        el.addEventListener('input', validateCreateAccountForm);
        if (id === 'reg-sec-question') {
          el.addEventListener('change', validateCreateAccountForm);
        }
    }
  });

  // Listener setup for Recovery Setup Form
  document.getElementById('form-recovery-setup')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const pin = document.getElementById('setup-recovery-pin').value.trim();
      const confirmPin = document.getElementById('setup-confirm-recovery-pin').value.trim();
      const errEl = document.getElementById('recovery-setup-error');
      const btn = document.getElementById('btn-save-recovery-pin') || document.querySelector('#form-recovery-setup button[type="submit"]');

      if (!/^\d{6}$/.test(pin)) {
          errEl.textContent = window.t('Recovery PIN must be exactly 6 digits.');
          return;
      }
      if (pin !== confirmPin) {
          errEl.textContent = window.t('Recovery PINs do not match.');
          return;
      }

      errEl.textContent = '';
      if (btn) {
          btn.disabled = true;
          btn.textContent = window.t('Saving...');
      }

      try {
          analyticsTrack("recovery_setup_started", { source: "signup" });
          const user = auth.currentUser;
          if (!user || !tempSignupMasterPassword) {
              throw new Error("Session expired. Please start over.");
          }

          tempSignupRecoveryPin = pin;
          await initializeOrUnlockVault(user, tempSignupMasterPassword);
          
          tempSignupRecoveryPin = null;
          tempSignupMasterPassword = null;

          // Thay thế ghi trực tiếp bằng gọi API an toàn
          await fetchVercelAPI('create-public-directory', 'POST');

          // Hủy trạng thái đăng ký, Sign out để bước tiếp theo Verify Email
          isSignupFlow = false; 
          sessionExpiredByInactivity = false;
          stopInactivityTracking();
          
          if (auth.currentUser) {
              await signOut(auth);
          }

          showScreen('screen-check-email');
          
          document.getElementById('form-signup').reset();
          document.getElementById('form-recovery-setup').reset();
          const loginPwdEl = document.getElementById('login-master-pwd');
          if(loginPwdEl) loginPwdEl.value = '';
          updateChecklist('', 'reg');
          analyticsTrack("recovery_setup_success", { source: "signup" });
          
      } catch (error) {
          console.error("Vault setup failed:", error);
          analyticsTrack("recovery_setup_failed", {
              source: "signup",
              errorCode: error?.code || error?.name || "unknown_error"
          });
          errEl.textContent = error.message || window.t('Action failed.');
      } finally {
          if (btn) {
              btn.disabled = false;
              btn.textContent = window.t('Save & Continue');
          }
      }
  });

  const validateRecNewPwd = () => {
      const pwd = document.getElementById('recovery-new-password')?.value || '';
      const confirm = document.getElementById('recovery-confirm-password')?.value || '';
      const isPwdValid = updateChecklist(pwd, 'rec-new');
      const isMatch = (pwd !== '' && pwd === confirm);
      const submitBtn = document.querySelector('#form-recovery-set-pwd button[type="submit"]');
      if (submitBtn) submitBtn.disabled = !(isPwdValid && isMatch);
  };
  document.getElementById('recovery-new-password')?.addEventListener('input', validateRecNewPwd);
  document.getElementById('recovery-confirm-password')?.addEventListener('input', validateRecNewPwd);

  const newPwdInputs = ['new-master-pwd', 'confirm-new-pwd'];
  newPwdInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', validateSetNewPwdForm);
  });

  document.getElementById('form-change-pwd').addEventListener('submit', handlePasswordChange);
  document.getElementById('form-sec-verification').addEventListener('submit', verifySecurityAnswer);

  // Set new password from dashboard flow
  document.getElementById('form-set-new-pwd').addEventListener('submit', updateNewPassword);

  document.getElementById('dashboard-btn-add-credential').addEventListener('click', core2OpenAddForm);
  document.getElementById('dashboard-btn-view-credentials').addEventListener('click', () => showDashboardView('view-core2-list'));
  document.getElementById('dashboard-btn-view-all').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-core2-list'); });
  document.getElementById('dashboard-btn-search').addEventListener('click', () => showDashboardView('view-core3-search'));
  document.getElementById('dashboard-btn-security').addEventListener('click', () => showDashboardView('view-change-pwd'));

  document.getElementById('core2-btn-add').addEventListener('click', core2OpenAddForm);
  document.getElementById('core2-input-category').addEventListener('change', core2ToggleCustomCategory);
  
  document.getElementById('core2-credential-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (currentRole === "inheritor") {
      appShowToast(window.t("VIEW ONLY access. Cannot save credentials."));
      return;
    }
    if(!core2ValidateCredential()) return;
    
    const categoryData = core2GetCategoryData();
    const formData = {
      platform: document.getElementById('core2-input-platform').value.trim(),
      username: document.getElementById('core2-input-username').value.trim(),
      password: document.getElementById('core2-input-password').value,
      website: document.getElementById('core2-input-website').value.trim(),
      category: categoryData.category,
      categoryGroup: categoryData.categoryGroup,
      notes: document.getElementById('core2-input-notes').value.trim(),
      folderId: document.getElementById('core2-input-folder').value || null,
      inheritEnabled: document.getElementById('core2-input-inheritable') ? document.getElementById('core2-input-inheritable').checked : true
    };

    const executeSave = async () => {
      const btn = document.getElementById('core2-btn-save');
      btn.disabled = true;
      btn.textContent = window.t('Saving...');
      try {
        if(core2CurrentId) await core2SaveEdit(core2CurrentId, formData);
        else await core2AddCredential(formData);
      } finally {
        btn.disabled = false;
        btn.textContent = core2CurrentId ? window.t('Save changes') : window.t('Save credential');
      }
    };
    
    const duplicate = core2CheckDuplicate(formData.platform, formData.username, core2CurrentId);
    if (duplicate) {
      const isArchived = duplicate.archived;
      const textEl = document.getElementById('duplicate-warning-text');
      if (isArchived) {
        textEl.textContent = window.t('An archived credential for this platform and username already exists.');
      } else {
        textEl.textContent = window.t('A credential for this platform and username already exists.');
      }
      
      core2PendingSaveCallback = executeSave;
      const modal = document.getElementById('modal-duplicate-warning');
      modal.classList.remove('hidden');
      document.getElementById('btn-duplicate-go-back').focus();
    } else {
      await executeSave();
    }
  });

  const returnFromCredentialForm = () => {
    if (core2CurrentFolderId) {
      renderFolderDetailPage();
      showDashboardView('view-folder-detail');
    } else {
      showDashboardView('view-core2-list');
    }
  };

  document.getElementById('core2-btn-back-from-form').addEventListener('click', (e) => {
    e.preventDefault();
    returnFromCredentialForm();
  });

  document.getElementById('core2-btn-cancel-form').addEventListener('click', () => {
    returnFromCredentialForm();
  });

  document.getElementById('core2-btn-back-from-detail').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentRole === 'inheritor') {
       showDashboardView('view-inherited-vault');
    } else if (core2CurrentFolderId) {
       renderFolderDetailPage();
       showDashboardView('view-folder-detail');
    } else {
       showDashboardView('view-core2-list');
    }
  });

  document.getElementById('core2-btn-show').addEventListener('click', (e) => { e.preventDefault(); core2TogglePassword(); });
  document.getElementById('core2-btn-copy').addEventListener('click', (e) => { e.preventDefault(); core2CopyPassword(); });
  document.getElementById('core2-btn-edit').addEventListener('click', () => core2OpenEdit(core2CurrentId));
  document.getElementById('core2-btn-delete').addEventListener('click', core2RequestDelete);
  document.getElementById('core2-btn-archive').addEventListener('click', core2RequestArchive);
  document.getElementById('core2-btn-restore').addEventListener('click', core2RequestRestore);
  
  document.getElementById('core2-select-status').addEventListener('change', core2RenderCredentialList);

  document.getElementById('core2-select-sort')?.addEventListener('change', core2RenderCredentialList);
  document.getElementById('core3-select-sort')?.addEventListener('change', core3Search);

  document.getElementById('core2-btn-confirm-cancel').addEventListener('click', core2CloseConfirm);
  document.getElementById('core2-btn-confirm-action').addEventListener('click', core2ConfirmAction);
  
  document.getElementById('core2-btn-success-view').addEventListener('click', () => { core2CloseSuccess(); core2ViewCredential(core2LastSavedId); });
  document.getElementById('core2-btn-success-back').addEventListener('click', () => { 
    core2CloseSuccess(); 
    if (currentRole === 'inheritor') showDashboardView('view-inherited-vault');
    else showDashboardView('view-core2-list'); 
  });

  document.getElementById('btn-duplicate-go-back').addEventListener('click', core2CloseDuplicateModal);
  
  document.getElementById('btn-duplicate-save-anyway').addEventListener('click', async () => {
    if (!core2PendingSaveCallback) return;
    const btn = document.getElementById('btn-duplicate-save-anyway');
    const formBtn = document.getElementById('core2-btn-save');
    
    btn.disabled = true;
    btn.textContent = window.t('Saving...');
    formBtn.disabled = true;
    formBtn.textContent = window.t('Saving...');

    try {
      await core2PendingSaveCallback();
      core2CloseDuplicateModal();
    } finally {
      btn.disabled = false;
      btn.textContent = window.t('Save Anyway');
      formBtn.disabled = false;
      formBtn.textContent = core2CurrentId ? window.t('Save changes') : window.t('Save credential');
    }
  });

  document.addEventListener('keydown', (e) => {
    const dupModal = document.getElementById('modal-duplicate-warning');
    if (dupModal && !dupModal.classList.contains('hidden') && e.key === 'Escape') {
      core2CloseDuplicateModal();
    }
  });

  document.getElementById('btn-cancel-create-folder')?.addEventListener('click', () => {
    document.getElementById('modal-core2-create-folder').classList.add('hidden');
  });

  document.getElementById('form-create-folder')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (currentRole === "inheritor") return;
    const folderName = document.getElementById('input-folder-name').value.trim();
    if (!folderName) {
      document.getElementById('err-folder-name').textContent = window.t("Folder name is required.");
      return;
    }
    const btn = document.getElementById('btn-save-folder');
    btn.disabled = true;
    btn.textContent = window.t("Creating...");
    try {
      await createNewFolder(folderName);
      document.getElementById('modal-core2-create-folder').classList.add('hidden');
      appShowToast(window.t("Folder created successfully."));
    } 
    catch (err) {
      document.getElementById('err-folder-name').textContent = err.message;
    } finally {
      btn.disabled = false;
      btn.textContent = window.t("Create");
    }
  });

  document.getElementById('btn-cancel-add-inheritor').addEventListener('click', () => {
    document.getElementById('modal-add-inheritor').classList.add('hidden');
  });

  document.getElementById('form-add-inheritor').addEventListener('submit', async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('input-inheritor-email');
    const email = emailInput.value.trim().toLowerCase();
    const errEl = document.getElementById('err-inheritor-email');
    const btn = document.getElementById('btn-save-inheritor');
    const user = auth.currentUser;

    errEl.textContent = '';
    if (!user) return;
    if (email === user.email.toLowerCase()) {
      errEl.textContent = window.t("You cannot inherit your own vault.");
      return;
    }
    
    const existingActiveOrPending = ownerInheritanceDocs.find(d => d.status === 'pending' || d.status === 'active');
    if (existingActiveOrPending) {
      errEl.textContent = window.t("You already have a designated inheritor.");
      return;
    }

    btn.disabled = true;
    btn.textContent = window.t('Sending...');
    try {
      let targetUid = null;
      try {
        // Verify the target account through Firebase Authentication on the server.
        // Do not rely on public_directory because it is a public RSA-key directory,
        // not the authoritative source for whether a Firebase account exists.
        const accountCheck = await fetchVercelAPI('check-account', 'POST', { email });

        if (!accountCheck?.exists || !accountCheck?.uid) {
          errEl.textContent = window.t("This email is not registered. The user must create a CheckKey account first.");
          return;
        }

        targetUid = accountCheck.uid;
      } catch(lookupErr) {
        console.error("Account verification failed:", lookupErr);
        errEl.textContent = window.t("Unable to verify this account. Please try again.");
        return;
      }

      await addDoc(collection(db, "trusted_access"), {
        ownerUid: user.uid,
        ownerEmail: user.email.trim().toLowerCase(),
        trustedEmail: email.trim().toLowerCase(),
        trustedUid: targetUid,
        status: 'pending',
        accessMode: 'inheritance_only',
        permission: 'view_only',
        wrappedVaultKey: 'pending_rsa_wrap', 
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      document.getElementById('modal-add-inheritor').classList.add('hidden');
      appShowToast(window.t('Invitation sent.'));
      analyticsTrack("inheritance_invitation_sent", { role:"owner", accessMode:"inheritance_only", permission:"view_only" });
      checkAndAutoWrapInheritance(); 
    } catch (err) {
      errEl.textContent = err.message || window.t("Failed to add inheritor.");
    } finally {
      btn.disabled = false;
      btn.textContent = window.t('Send Invitation');
    }
  });

  document.getElementById('btn-initiate-deletion').addEventListener('click', () => {
    document.getElementById('delete-master-pwd').value = '';
    document.getElementById('delete-confirmation-text').value = '';
    document.getElementById('err-delete-account').textContent = '';
    document.getElementById('btn-submit-delete-account').disabled = true;
    document.getElementById('modal-delete-account').classList.remove('hidden');
  });

  document.getElementById('btn-cancel-delete-modal').addEventListener('click', () => {
    document.getElementById('modal-delete-account').classList.add('hidden');
  });

  const validateDeleteForm = () => {
    const pwd = document.getElementById('delete-master-pwd').value;
    const confirm = document.getElementById('delete-confirmation-text').value;
    document.getElementById('btn-submit-delete-account').disabled = !(pwd && confirm === 'DELETE');
  };
  
  document.getElementById('delete-master-pwd').addEventListener('input', validateDeleteForm);
  document.getElementById('delete-confirmation-text').addEventListener('input', validateDeleteForm);

  // === CẬP NHẬT HANDLE SIGNUP TRÁNH LỖI PERMISSION DENIED ===
  async function handleSignUp(e) {
    e.preventDefault();
    const btn = document.querySelector('#form-signup button[type="submit"]');

    btn.disabled = true;
    btn.textContent = window.t('Processing...');
    clearAllErrors();

    const email = document.getElementById('reg-email').value.trim();
    const pwd = document.getElementById('reg-master-pwd').value;
    const question = document.getElementById('reg-sec-question').value;
    const answer = document.getElementById('reg-sec-answer').value.trim().toLowerCase();

    try {
      isSignupFlow = true;
      analyticsTrack("signup_started", { authMethod: "email_password" });
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);

      const { hash, salt } = await hashSecurityAnswer(answer);

      // Bước 3: Ghi users/{uid}
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        securityQuestion: question,
        securityAnswerHash: hash,
        securityAnswerSalt: salt,
        createdAt: serverTimestamp()
      });

      // THE FIX: Dùng API an toàn thay vì ghi đè trực tiếp client-side
      await fetchVercelAPI('create-public-directory', 'POST');

      // Bước 6: Gửi email verify
      await sendEmailVerification(userCredential.user);

      tempSignupMasterPassword = pwd; // Lưu tạm thời cho first-vault setup ở bước nhập PIN kế tiếp

      // Bước 7: Mở màn hình tạo mã phục hồi
      showScreen('screen-recovery-setup');
      analyticsTrack("signup_success", { authMethod: "email_password", verificationRequired: true });

    } catch (error) {
      isSignupFlow = false;
      analyticsTrack("signup_failed", {
        authMethod: "email_password",
        errorCode: error?.code || error?.name || "unknown_error"
      });
      handleFirebaseError(error, 'reg-email');
    } finally {
      btn.disabled = false;
      btn.textContent = window.t('Create account');
    }
  }

  document.getElementById('form-delete-account').addEventListener('submit', handleScheduleAccountDeletion);
  document.getElementById('btn-cancel-deletion').addEventListener('click', handleCancelAccountDeletion);

  document.getElementById('core3-search-form').addEventListener('submit', (e) => { e.preventDefault(); core3Search(); });
  document.getElementById('core3-btn-reset-filters').addEventListener('click', core3ClearSearch);
  
  document.getElementById('core3-btn-back-from-detail').addEventListener('click', (e) => { e.preventDefault(); showDashboardView('view-core3-search'); });
  document.getElementById('core3-btn-show-selected').addEventListener('click', (e) => { e.preventDefault(); core3ToggleSelectedPassword(); });
  document.getElementById('core3-btn-copy-selected')?.addEventListener('click', (e) => { e.preventDefault(); core3CopySelectedPassword(); });
  document.getElementById('core3-btn-view-history').addEventListener('click', () => core3OpenHistory());
  
  document.getElementById('core3-btn-back-to-credential').addEventListener('click', (e) => { e.preventDefault(); core3ViewSelectedCredential(core3CurrentHistoryId); });
  document.getElementById('core3-btn-show-current').addEventListener('click', (e) => { e.preventDefault(); core3ToggleCurrentPassword(); });

  const modals = [
    document.getElementById('modal-core2-confirm'), 
    document.getElementById('modal-core2-success'),
    document.getElementById('modal-core2-create-folder'),
    document.getElementById('modal-delete-account'),
    document.getElementById('modal-add-inheritor')
  ];

  modals.forEach(m => {
    if(m) {
        m.addEventListener('click', (e) => {
          if (e.target === m) m.classList.add('hidden');
        });
    }
  });

  const dupWarningModal = document.getElementById('modal-duplicate-warning');
  if (dupWarningModal) {
    dupWarningModal.addEventListener('click', (e) => {
      if (e.target === dupWarningModal) core2CloseDuplicateModal();
    });
  }

  // ==========================================
  // RECOVERY PIN UI EVENTS
  // ==========================================
  document.getElementById('forgot-master-password')?.addEventListener('click', (e) => {
      e.preventDefault();
      showScreen('screen-forgot-password');
  });

  document.getElementById('link-back-to-login')?.addEventListener('click', (e) => {
      e.preventDefault();
      isRecoveryFlow = false;
      showScreen('screen-login');
  });

  document.getElementById('form-forgot-password')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('recovery-email').value.trim().toLowerCase();
      const recPin = document.getElementById('recovery-pin').value.trim();
      const btn = document.querySelector('#form-forgot-password button[type="submit"]');
      const errEl = document.getElementById('recovery-error');
      
      if (!email || !recPin) return;

      if (!/^\d{6}$/.test(recPin)) {
          errEl.textContent = window.t('Invalid Recovery PIN.');
          errEl.classList.remove('hidden');
          return;
      }
      
      btn.disabled = true;
      btn.textContent = window.t('Processing...');
      errEl.textContent = '';
      errEl.classList.add('hidden');
      
      isRecoveryFlow = true; 
       analyticsTrack("recovery_started", { method: "recovery_pin" });

      try {
          // 1. Get recovery salt from backend (no direct unauthenticated Firestore reads)
          let saltRes;
          try {
              saltRes = await fetchPublicAPI('get-recovery-salt', 'POST', { email });
          } catch (apiErr) {
              throw new Error("Unable to initialize recovery. Please try again.");
          }

          if (!saltRes || !saltRes.success || !saltRes.recoveryVerifierSalt) {
              throw new Error("Unable to initialize recovery. Please try again.");
          }

          // 2. Compute verifier locally
          const recoveryKeyVerifier = await verifyHash(recPin, saltRes.recoveryVerifierSalt);

          // 3. Request recovery vault access metadata
          let accessRes;
          try {
              accessRes = await fetchPublicAPI('recover-vault-access', 'POST', {
                  email,
                  recoveryKeyVerifier
              });
          } catch (apiErr) {
              throw new Error("Invalid Recovery PIN."); 
          }

          if (!accessRes || !accessRes.success || !accessRes.customToken) {
              throw new Error("Invalid Recovery PIN.");
          }

          // 4. Authenticate using Custom Token
          await signInWithCustomToken(auth, accessRes.customToken);

          // 5. Unwrap existing Vault Key and Refresh Token concurrently (Optimization)
          const unwrapPromise = (async () => {
              const recSalt = base64ToUint8Array(accessRes.recoveryKdfSalt);
              const recIv = base64ToUint8Array(accessRes.recoveryWrapIv);
              const recWrappedKey = base64ToUint8Array(accessRes.recoveryWrappedVaultKey).buffer;
              const recKek = await deriveKeyFromPassword(recPin, recSalt, accessRes.kdfIterations || KDF_ITERATIONS);
              return await unwrapVaultKey(recWrappedKey, recKek, recIv);
          })();

          let recoveredVaultKey;
          try {
              const [unwrappedKey] = await Promise.all([
                  unwrapPromise,
                  auth.currentUser ? auth.currentUser.getIdToken(true) : Promise.resolve()
              ]);
              recoveredVaultKey = unwrappedKey;
          } catch (decryptErr) {
              throw new Error("Invalid Recovery PIN.");
          }

          if (!recoveredVaultKey) throw new Error("Invalid Recovery PIN.");

          // Keep entirely in RAM
          tempRecoveryMetadata = {
              vaultKey: recoveredVaultKey,
              uid: accessRes.uid
          };

           analyticsTrack("recovery_verified", { method: "recovery_pin" });
          showScreen('screen-recovery-set-password');
          document.getElementById('form-forgot-password').reset();
      } catch (error) {
          isRecoveryFlow = false; 
          console.error("Recovery Error: ", error);
          let msg = error.message;
          if (msg === "Invalid Recovery PIN." || msg === "Unable to initialize recovery. Please try again.") {
              errEl.textContent = window.t(msg);
          } else {
              errEl.textContent = window.t("Unable to initialize recovery. Please try again.");
          }
          errEl.classList.remove('hidden');
      } finally {
          btn.disabled = false;
          btn.textContent = window.t('Continue');
      }
  });
  
  document.getElementById('form-recovery-set-pwd')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const newPwd = document.getElementById('recovery-new-password').value;
      const btn = document.querySelector('#form-recovery-set-pwd button[type="submit"]');
      const errEl = document.getElementById('recovery-password-error');
      
      btn.disabled = true;
      btn.textContent = window.t('Updating...');
      errEl.textContent = '';
      
      try {
          if (!tempRecoveryMetadata || !tempRecoveryMetadata.vaultKey || !tempRecoveryMetadata.uid) {
              throw new Error("Session expired. Please start over.");
          }

          if (!auth.currentUser) {
              throw new Error("BLOCKER: Firebase Auth cannot be updated without an active session.");
          }

          const vaultRef = doc(db, "users", tempRecoveryMetadata.uid, "vault", "config");
          const vaultSnap = await getDoc(vaultRef);

          if (!vaultSnap.exists()) throw new Error("Vault not found.");
          const originalData = vaultSnap.data();

          // [NEW] Check for duplicate master password by attempting to unwrap with new password
          try {
              const oldSalt = base64ToUint8Array(originalData.kdfSalt);
              const oldIv = base64ToUint8Array(originalData.wrapIv);
              const oldWrapped = base64ToUint8Array(originalData.wrappedVaultKey).buffer;
              const testKek = await deriveKeyFromPassword(newPwd, oldSalt, originalData.kdfIterations || KDF_ITERATIONS);
              await unwrapVaultKey(oldWrapped, testKek, oldIv);
              
              // If unwrap succeeds, it means the password is the same
              errEl.textContent = window.t('New master password must be different from your current password.');
              btn.disabled = false;
              btn.textContent = window.t('Set New Master Password');
              return;
          } catch (decryptErr) {
              // Fails to decrypt meaning the password is DIFFERENT (Safe to proceed)
          }

          // Derive new wrapper for the EXACT SAME Vault Key
          const newSalt = window.crypto.getRandomValues(new Uint8Array(16));
          const newKek = await deriveKeyFromPassword(newPwd, newSalt, KDF_ITERATIONS);
          const { wrappedKey, iv } = await wrapVaultKey(tempRecoveryMetadata.vaultKey, newKek);
          
          // Save wrapper first to prevent changing auth password but failing to update vault
          await updateDoc(vaultRef, {
              wrappedVaultKey: arrayBufferToBase64(wrappedKey),
              wrapIv: arrayBufferToBase64(iv),
              kdfSalt: arrayBufferToBase64(newSalt),
              kdfIterations: KDF_ITERATIONS,
              updatedAt: serverTimestamp()
          });

          try {
              await updatePassword(auth.currentUser, newPwd);
          } catch (authError) {
              // Rollback if firebase auth fails
              await updateDoc(vaultRef, {
                  wrappedVaultKey: originalData.wrappedVaultKey,
                  wrapIv: originalData.wrapIv,
                  kdfSalt: originalData.kdfSalt,
                  kdfIterations: originalData.kdfIterations || KDF_ITERATIONS,
                  updatedAt: originalData.updatedAt || serverTimestamp()
              });
              throw authError; 
          }
          
          tempRecoveryMetadata = null;
          
          await signOut(auth);
           analyticsTrack("recovery_success", { method: "recovery_pin" });
          showScreen('screen-recovery-success');
          isRecoveryFlow = false;
          document.getElementById('form-recovery-set-pwd').reset();
      } catch (error) {
           analyticsTrack("recovery_password_reset_failed", {
               method: "recovery_pin",
               errorCode: error?.code || error?.name || "unknown_error"
           });
          if (error.code === 'auth/requires-recent-login') {
              errEl.textContent = "Requires recent login. Blocker encountered.";
          } else {
              errEl.textContent = error.message || window.t('Unable to recover your vault.');
          }
      } finally {
          btn.disabled = false;
          btn.textContent = window.t('Set New Master Password');
      }
  });

  document.getElementById('btn-recovery-success-login')?.addEventListener('click', () => {
      showScreen('screen-login');
  });

  document.getElementById('link-cancel-recovery')?.addEventListener('click', async (e) => {
      e.preventDefault();
      tempRecoveryMetadata = null;
      isRecoveryFlow = false;
      if (auth.currentUser) {
          await signOut(auth);
      }
      showScreen('screen-login');
  });

  refreshAllViews();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeUI);
} else {
  initializeUI();
}

// ==========================================
// CORE 4: CRYPTO HELPERS & VAULT LOGIC
// ==========================================

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToUint8Array(base64) {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

async function deriveKeyFromPassword(password, saltUint8, iterations) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  return await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltUint8,
      iterations: iterations,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function generateVaultKey() {
  return await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

async function wrapVaultKey(vaultKey, kek) {
  const rawVaultKey = await window.crypto.subtle.exportKey("raw", vaultKey);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const wrappedKey = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    kek,
    rawVaultKey
  );

  const tempArr = new Uint8Array(rawVaultKey);
  tempArr.fill(0);
  
  return { wrappedKey, iv };
}

async function unwrapVaultKey(wrappedKeyBuffer, kek, ivUint8) {
  const rawVaultKey = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivUint8 },
    kek,
    wrappedKeyBuffer
  );

  const importedVaultKey = await window.crypto.subtle.importKey(
    "raw",
    rawVaultKey,
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"]
  );

  const tempArr = new Uint8Array(rawVaultKey);
  tempArr.fill(0);
  
  return importedVaultKey;
}

async function rewrapVaultKeyWithNewPassword(newMasterPassword) {
  if (!activeVaultKey) throw new Error("Vault Key not found in RAM.");
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const kek = await deriveKeyFromPassword(newMasterPassword, salt, KDF_ITERATIONS);
  const { wrappedKey, iv } = await wrapVaultKey(activeVaultKey, kek);
  
  return {
    pendingWrappedVaultKey: arrayBufferToBase64(wrappedKey),
    pendingWrapIv: arrayBufferToBase64(iv),
    pendingKdfSalt: arrayBufferToBase64(salt),
    pendingKdfIterations: KDF_ITERATIONS,
    pendingVersion: VAULT_ENCRYPTION_VERSION,
    pendingCreatedAt: serverTimestamp()
  };
}

async function encryptData(dataObj, key) {
  const enc = new TextEncoder();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const ciphertext = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    enc.encode(JSON.stringify(dataObj))
  );

  return { ciphertext, iv };
}

async function decryptData(ciphertextBuffer, ivUint8, key) {
  const dec = new TextDecoder();
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivUint8 },
    key,
    ciphertextBuffer
  );
  return JSON.parse(dec.decode(decrypted));
}

// FIX: RSA PROVISIONING
async function ensureRSAKeysProvisioned(user) {
  if (!activeVaultKey || !activeVaultUid || activeVaultUid !== user.uid) return;
  const rsaPath = `users/${user.uid}/vault/rsaKey`;
  const rsaDocRef = doc(db, "users", user.uid, "vault", "rsaKey");
  let rsaSnap;

  try {
    rsaSnap = await getDoc(rsaDocRef);
  } catch (error) {
    console.error("RSA GET FAILED", {
      path: rsaPath,
      code: error?.code,
      message: error?.message
    });
    throw error;
  }
  
  let publicKeyBase64 = null;

  if (!rsaSnap.exists()) {
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );
    const spkiBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const pkcs8Buffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    publicKeyBase64 = arrayBufferToBase64(spkiBuffer);
    const privateKeyBase64 = arrayBufferToBase64(pkcs8Buffer);
    
    const { ciphertext, iv } = await encryptData({ privateKey: privateKeyBase64 }, activeVaultKey);
    
    try {
      await setDoc(rsaDocRef, {
        ciphertext: arrayBufferToBase64(ciphertext),
        iv: arrayBufferToBase64(iv),
        publicKey: publicKeyBase64,
        encryptionVersion: VAULT_ENCRYPTION_VERSION,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.warn("RSA STEP A FAILED, attempting fallback read", error);
      rsaSnap = await getDoc(rsaDocRef);
      if (rsaSnap.exists() && rsaSnap.data().publicKey) {
         publicKeyBase64 = rsaSnap.data().publicKey;
      } else {
         throw error;
      }
    }
  } else {
    const data = rsaSnap.data();
    if (data.publicKey) {
      publicKeyBase64 = data.publicKey;
    }
  }

  if (publicKeyBase64) {
    const normalizedEmail = user.email.trim().toLowerCase();
    const emailHash = await hashStringSHA256(normalizedEmail);
    const pubDirPath = `public_directory/${emailHash}`;
    const pubDirRef = doc(db, "public_directory", emailHash);
    
    try {
      await setDoc(pubDirRef, {
        uid: user.uid,
        email: normalizedEmail,
        publicKey: publicKeyBase64,
        updatedAt: serverTimestamp()
      }, { merge: true }); // Tự động merge, tránh bị từ chối do cache token email_verified
    } catch (error) {
      console.warn("RSA STEP B FAILED - Skipped to prevent login block", { 
        path: pubDirPath,
        code: error?.code, 
        message: error?.message 
      });
      // KHÔNG ném lỗi ra ngoài. Lỗi này sẽ được Firestore SDK tự động thử lại hoặc sync lại vào lần đăng nhập kế tiếp khi cache ổn định.
    }
  }
}

async function initializeOrUnlockVault(user, masterPassword) {
  let isFirstTimeSetup = false;
  try {
    const vaultRef = doc(db, "users", user.uid, "vault", "config");
    const vaultSnap = await getDoc(vaultRef);

    if (!vaultSnap.exists()) {
      isFirstTimeSetup = true;

      if (!tempSignupRecoveryPin) {
          const err = new Error("Recovery PIN missing");
          err.code = "vault/missing-recovery-pin";
          throw err;
      }

      const salt = window.crypto.getRandomValues(new Uint8Array(16));
      const kek = await deriveKeyFromPassword(masterPassword, salt, KDF_ITERATIONS);
      const vaultKey = await generateVaultKey();
      
      const { wrappedKey, iv } = await wrapVaultKey(vaultKey, kek);

      const recSalt = window.crypto.getRandomValues(new Uint8Array(16));
      const recKek = await deriveKeyFromPassword(tempSignupRecoveryPin, recSalt, KDF_ITERATIONS);
      const { wrappedKey: recWrappedKey, iv: recIv } = await wrapVaultKey(vaultKey, recKek);

      // ADDED: Generate the one-way verifier fields for the API authorization
      const verifierSalt = window.crypto.getRandomValues(new Uint8Array(16));
      const verifierSaltHex = Array.from(verifierSalt).map(b => b.toString(16).padStart(2, '0')).join('');
      const recoveryKeyVerifier = await verifyHash(tempSignupRecoveryPin, verifierSaltHex);

      await setDoc(vaultRef, {
        wrappedVaultKey: arrayBufferToBase64(wrappedKey),
        wrapIv: arrayBufferToBase64(iv),
        kdfSalt: arrayBufferToBase64(salt),
        kdfIterations: KDF_ITERATIONS,
        encryptionVersion: VAULT_ENCRYPTION_VERSION,
        recoveryWrappedVaultKey: arrayBufferToBase64(recWrappedKey),
        recoveryWrapIv: arrayBufferToBase64(recIv),
        recoveryKdfSalt: arrayBufferToBase64(recSalt),
        recoveryKeyVerifier: recoveryKeyVerifier,             // ADDED
        recoveryVerifierSalt: verifierSaltHex,                // ADDED
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const rawVaultKey = await window.crypto.subtle.exportKey("raw", vaultKey);
      activeVaultKey = await window.crypto.subtle.importKey(
        "raw", 
        rawVaultKey, 
        { name: "AES-GCM" }, 
        true,
        ["encrypt", "decrypt"]
      );

      const tempArr = new Uint8Array(rawVaultKey);
      tempArr.fill(0);

    } else {
      const data = vaultSnap.data();
      try {
        const salt = base64ToUint8Array(data.kdfSalt);
        const iv = base64ToUint8Array(data.wrapIv);
        const wrappedKey = base64ToUint8Array(data.wrappedVaultKey).buffer;

        const kek = await deriveKeyFromPassword(masterPassword, salt, data.kdfIterations);
        activeVaultKey = await unwrapVaultKey(wrappedKey, kek, iv);
      } catch (err) {
        if (data.pendingWrappedVaultKey) {
          try {
            const pSalt = base64ToUint8Array(data.pendingKdfSalt);
            const pIv = base64ToUint8Array(data.pendingWrapIv);
            const pWrappedKey = base64ToUint8Array(data.pendingWrappedVaultKey).buffer;
            const pKek = await deriveKeyFromPassword(masterPassword, pSalt, data.pendingKdfIterations);
            activeVaultKey = await unwrapVaultKey(pWrappedKey, pKek, pIv);
            
            await updateDoc(vaultRef, {
                wrappedVaultKey: data.pendingWrappedVaultKey,
                wrapIv: data.pendingWrapIv,
                kdfSalt: data.pendingKdfSalt,
                kdfIterations: data.pendingKdfIterations,
                encryptionVersion: data.pendingVersion,
                updatedAt: serverTimestamp(),
                pendingWrappedVaultKey: deleteField(),
                pendingWrapIv: deleteField(),
                pendingKdfSalt: deleteField(),
                pendingKdfIterations: deleteField(),
                pendingVersion: deleteField(),
                pendingCreatedAt: deleteField()
            });
          } catch (pendingErr) {
            throw new Error("Vault decryption failed for both active and pending configs.");
          }
        } else {
          throw err;
        }
      }
    }
    
    activeVaultUid = user.uid;
    myVaultKey = activeVaultKey; 
    currentRole = "owner";

    return isFirstTimeSetup;
  } catch (error) {
    activeVaultKey = null;
    activeVaultUid = null;
    myVaultKey = null;
    currentRole = "owner";
    throw error;
  }
}

// FIX: INHERITANCE STATE RESET
function lockVault() {
  stopAutoWrapChecker();
  stopDeviceAccessSubscriptions();
  stopCredentialsSubscription();
  stopFoldersSubscription();
  stopInheritanceSubscription();
  inheritedCredentials = [];
  core2Credentials = [];
  activeVaultKey = null;
  activeVaultUid = null;
  myVaultKey = null;
  currentRole = "owner";
  
  const unlockPwdInput = document.getElementById('vault-unlock-pwd');
  if (unlockPwdInput) unlockPwdInput.value = '';
  
  resetCore23State();
}

function exitInheritedVault() {
  if (currentRole !== 'inheritor') return;
  analyticsTrack("inherited_vault_exit", { role:"inheritor", accessMode:"inheritance_only", permission:"view_only" });
  analyticsStopFeature("inherited_vault", { role:"inheritor" });
  inheritedCredentials = [];
  activeVaultUid = auth.currentUser.uid;
  activeVaultKey = myVaultKey;
  currentRole = 'owner';
  
  document.getElementById('btn-exit-inherited-vault-2')?.classList.add('hidden');
  document.getElementById('btn-exit-inherited-vault')?.style.setProperty('display', 'none');
  stopFoldersSubscription();
  stopCredentialsSubscription();
  
  subscribeToFolders();
  subscribeToCredentials();
  
  appShowToast(window.t('Returned to your vault.'));
  showDashboardView('view-core2-list');
}

// ==========================================
// EMERGENCY ACCESS SYNC & LOGIC
// ==========================================

// FIX: UID-BASED INHERITANCE
async function ensureVaultAccessDocument(ownerUid, inheritorUid) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("No authenticated user.");
  if (currentUser.uid !== inheritorUid) {
    throw new Error("Unauthorized: Vault access identity mismatch.");
  }

  const vaultAccessRef = doc(db, "users", ownerUid, "vault_access", inheritorUid);
  const vaultAccessSnap = await getDoc(vaultAccessRef);

  if (vaultAccessSnap.exists()) {
    const data = vaultAccessSnap.data();

    if (
      data.ownerUid === ownerUid &&
      data.inheritorUid === inheritorUid &&
      data.status === "active" &&
      data.permission === "view_only" &&
      data.accessMode === "inheritance_only"
    ) {
      return;
    }
  }

  await setDoc(vaultAccessRef, {
    ownerUid,
    inheritorUid,
    permission: "view_only",
    status: "active",
    accessMode: "inheritance_only",
    createdAt: vaultAccessSnap.exists() && vaultAccessSnap.data().createdAt
      ? vaultAccessSnap.data().createdAt
      : serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
}

// FIX: INHERITANCE STATE RESET
function stopInheritanceSubscription() {
  if (unsubscribeInheritanceOwner) {
    unsubscribeInheritanceOwner();
    unsubscribeInheritanceOwner = null;
  }
  if (unsubscribeInheritanceInheritor) {
    unsubscribeInheritanceInheritor();
    unsubscribeInheritanceInheritor = null;
  }
  ownerInheritanceDocs = [];
  inheritorPendingDocs = [];
  inheritorActiveDocs = [];
}

async function attemptAutoWrapVaultKey(relId, trustedEmail) {
  if (!activeVaultKey || currentRole !== 'owner') return;
  
  const normalizedEmail = trustedEmail.trim().toLowerCase();
  const emailHash = await hashStringSHA256(normalizedEmail);
  const pubDirRef = doc(db, "public_directory", emailHash);
  
  const pubDirSnap = await getDoc(pubDirRef);
  if (!pubDirSnap.exists() || !pubDirSnap.data().publicKey) {
      return;
  }

  // If the public directory points to an account that no longer
  // matches the current invitation target, do not wrap the vault key.
  const directoryUid = pubDirSnap.data().uid;
  if (!directoryUid) return;

  const relationshipSnap = await getDoc(doc(db, "trusted_access", relId));
  if (!relationshipSnap.exists()) return;

  const relationship = relationshipSnap.data();
  if (relationship.ownerUid !== auth.currentUser?.uid) return;
  if (relationship.trustedEmail?.trim().toLowerCase() !== normalizedEmail) return;

  if (relationship.trustedUid && relationship.trustedUid !== directoryUid) {
      return;
  }
  
  const pubKeyB64 = pubDirSnap.data().publicKey;
  const spkiBuffer = base64ToUint8Array(pubKeyB64).buffer;

  const importedPubKey = await window.crypto.subtle.importKey(
      "spki",
      spkiBuffer,
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ["encrypt"]
  );

  const rawVaultKey = await window.crypto.subtle.exportKey("raw", activeVaultKey);
  
  const encryptedVaultKeyBuffer = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      importedPubKey,
      rawVaultKey
  );
  
  const wrappedVaultKeyBase64 = arrayBufferToBase64(encryptedVaultKeyBuffer);
  
  await updateDoc(doc(db, "trusted_access", relId), {
      wrappedVaultKey: wrappedVaultKeyBase64,
      updatedAt: serverTimestamp() 
  });
}

async function checkAndAutoWrapInheritance() {
  for (const docItem of ownerInheritanceDocs) {
      if (docItem.wrappedVaultKey === 'pending_rsa_wrap' && activeVaultKey && currentRole === 'owner') {
          try {
              await attemptAutoWrapVaultKey(docItem.id, docItem.trustedEmail);
          } catch (err) {
              console.warn("Auto-wrap failed for", docItem.trustedEmail, err);
          }
      }
  }
}

function startAutoWrapChecker() {
  if (autoWrapInterval) clearInterval(autoWrapInterval);
  autoWrapInterval = setInterval(() => {
    if (activeVaultKey && currentRole === 'owner') {
      checkAndAutoWrapInheritance();
    }
  }, 15000);
}

function stopAutoWrapChecker() {
  if (autoWrapInterval) {
    clearInterval(autoWrapInterval);
    autoWrapInterval = null;
  }
}

// FIX: SAME-EMAIL ACCOUNT ISOLATION
// FIX: UID-BASED INHERITANCE
function subscribeToInheritance(user) {
  if (!user) return;
  stopInheritanceSubscription();

  const normalizedEmail = (user.email || '').trim().toLowerCase();

  // Owner relationships are always authorized by ownerUid.
  const ownerQuery = query(
    collection(db, "trusted_access"),
    where("ownerUid", "==", user.uid)
  );

  // PENDING invitations are discovered by email, but only while they
  // are still unbound to a Firebase UID. This prevents a new account
  // with the same email from seeing an old invitation already bound
  // to a different UID.
  const pendingUnboundQuery = query(
    collection(db, "trusted_access"),
    where("trustedEmail", "==", normalizedEmail),
    where("status", "==", "pending"),
    where("trustedUid", "==", null)
  );

  // If the invitation was created when this exact Firebase account
  // already existed, the Owner may have stored its UID immediately.
  const pendingBoundQuery = query(
    collection(db, "trusted_access"),
    where("trustedUid", "==", user.uid),
    where("status", "==", "pending")
  );

  // ACTIVE relationships are authorized strictly by Firebase UID.
  // Include every field enforced by Firestore Rules so the query itself
  // is provably restricted to documents the current Inheritor may read.
  const activeInheritorQuery = query(
    collection(db, "trusted_access"),
    where("trustedUid", "==", user.uid),
    where("status", "==", "active"),
    where("permission", "==", "view_only"),
    where("accessMode", "==", "inheritance_only")
  );

  unsubscribeInheritanceOwner = onSnapshot(ownerQuery, async (snap) => {
    const rawOwnerDocs = snap.docs
      .map(d => ({ id: d.id, ...d.data() }))
      .filter(d => d.status !== 'revoked');

    // Clean up stale Emergency Access relationships whose target account
    // no longer exists. Firestore Rules prevent client deletes, so the
    // Owner revokes the stale relationship instead.
    const validOwnerDocs = [];
    for (const relationship of rawOwnerDocs) {
      if (!relationship.trustedUid) {
        validOwnerDocs.push(relationship);
        continue;
      }

      try {
        const targetUserSnap = await getDoc(
          doc(db, "users", relationship.trustedUid)
        );

        if (!targetUserSnap.exists()) {
          await updateDoc(
            doc(db, "trusted_access", relationship.id),
            {
              status: 'revoked',
              updatedAt: serverTimestamp()
            }
          );

          try {
            await deleteDoc(
              doc(
                db,
                "users",
                user.uid,
                "vault_access",
                relationship.trustedUid
              )
            );
          } catch (vaultAccessError) {
            console.warn(
              "Failed to clean stale vault_access record:",
              vaultAccessError
            );
          }

          analyticsTrack("inheritance_revoked", {
            role: "owner",
            reason: "target_account_deleted",
            accessMode: "inheritance_only",
            permission: "view_only"
          });
          continue;
        }
      } catch (cleanupError) {
        console.warn(
          "Unable to verify Emergency Access target account:",
          cleanupError
        );
      }

      validOwnerDocs.push(relationship);
    }

    ownerInheritanceDocs = validOwnerDocs;

    if (activeVaultKey && currentRole === 'owner') {
      await checkAndAutoWrapInheritance();
    }

    if (document.getElementById('view-emergency-access')?.classList.contains('active')) {
      renderInheritanceView();
    }
  }, (error) => {
    console.error("Owner inheritance sync error:", error);
    if (error.code !== 'permission-denied') {
      appShowToast(window.t("Owner inheritance sync paused."));
    } else {
      console.warn("Owner inheritance listener permission-denied.");
    }
  });

  let pendingUnboundDocs = [];
  let pendingBoundDocs = [];
  let activeDocs = [];

  const renderInheritorSnapshots = () => {
    const combined = [
      ...pendingUnboundDocs,
      ...pendingBoundDocs,
      ...activeDocs
    ];

    const byId = new Map();
    for (const item of combined) byId.set(item.id, item);

    const docs = Array.from(byId.values());

    inheritorPendingDocs = docs.filter(d => {
      if (d.status !== 'pending') return false;

      // An unbound invitation may be claimed only by the email
      // account that was invited.
      if (!d.trustedUid) return true;

      return d.trustedUid === user.uid;
    });

    inheritorActiveDocs = docs.filter(d =>
      d.status === 'active' &&
      d.trustedUid === user.uid
    );

    if (document.getElementById('view-emergency-access')?.classList.contains('active')) {
      renderInheritanceView();
    }
  };

  let pendingUnboundUnsub = null;
  let pendingBoundUnsub = null;
  let activeUnsub = null;

  pendingUnboundUnsub = onSnapshot(pendingUnboundQuery, (snap) => {
    pendingUnboundDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderInheritorSnapshots();
  }, (error) => {
    console.error("Inheritor pending-unbound sync error:", error);
    if (error.code !== 'permission-denied') {
      appShowToast(window.t("Inheritor sync paused."));
    } else {
      console.warn("Inheritor pending-unbound listener permission-denied.");
    }
  });

  pendingBoundUnsub = onSnapshot(pendingBoundQuery, (snap) => {
    pendingBoundDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderInheritorSnapshots();
  }, (error) => {
    console.error("Inheritor pending-bound sync error:", error);
    if (error.code !== 'permission-denied') {
      appShowToast(window.t("Inheritor sync paused."));
    } else {
      console.warn("Inheritor pending-bound listener permission-denied.");
    }
  });

  activeUnsub = onSnapshot(activeInheritorQuery, (snap) => {
    activeDocs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    renderInheritorSnapshots();
  }, (error) => {
    console.error("Inheritor active sync error:", error);
    if (error.code !== 'permission-denied') {
      appShowToast(window.t("Inheritor sync paused."));
    } else {
      console.warn("Inheritor active listener permission-denied. Check Firestore Rules/query compatibility.");
    }
  });

  unsubscribeInheritanceInheritor = () => {
    if (pendingUnboundUnsub) pendingUnboundUnsub();
    if (pendingBoundUnsub) pendingBoundUnsub();
    if (activeUnsub) activeUnsub();
  };
}

function renderInheritanceView() {
  // 1. Owner Area
  const ownerArea = document.getElementById('emergency-access-owner-area');
  
  if (ownerInheritanceDocs.length === 0) {
    ownerArea.innerHTML = `
      <button type="button" class="btn-primary btn-auto mt-2" id="btn-open-add-inheritor">${window.t('+ Add Inheritor')}</button>
    `;
    
    document.getElementById('btn-open-add-inheritor').addEventListener('click', () => {
      document.getElementById('input-inheritor-email').value = '';
      document.getElementById('err-inheritor-email').textContent = '';
      document.getElementById('modal-add-inheritor').classList.remove('hidden');
    });
  } else {
    const d = ownerInheritanceDocs[0];
    ownerArea.innerHTML = `
      <div class="detail-panel border-bottom pb-3">
         <h4 class="mb-1">${window.t('Your Inheritor')}</h4>
         <p class="font-weight-bold mb-1">${appEscape(d.trustedEmail)}</p>
         <p class="text-muted mb-1" style="font-size: 14px; text-transform: capitalize;">${window.t('Status: ')}${window.t(d.status)}</p>
         <p class="text-muted mb-3" style="font-size: 14px;">${window.t('Access: View only')}</p>
         <button class="btn-danger btn-auto" id="btn-revoke-inheritor" data-id="${d.id}">
            ${d.status === 'pending' ? window.t('Cancel Invitation') : window.t('Revoke Inheritance')}
         </button>
      </div>
    `;
    
    document.getElementById('btn-revoke-inheritor').addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');
      const docItem = ownerInheritanceDocs.find(item => item.id === id);
      if(!docItem) return;
      
      e.target.disabled = true;
      e.target.textContent = window.t('Revoking...');
      try {
        await updateDoc(doc(db, 'trusted_access', id), { status: 'revoked', updatedAt: serverTimestamp() });
        analyticsTrack("inheritance_revoked", { role:"owner", previousStatus:docItem.status || "unknown", accessMode:"inheritance_only", permission:"view_only" });
        if (docItem.trustedUid) {
           await deleteDoc(doc(db, "users", auth.currentUser.uid, "vault_access", docItem.trustedUid));
        }
        appShowToast(window.t('Inheritance revoked.'));
      } catch (err) {
        appShowToast(window.t('Failed to revoke inheritor.'));
        e.target.disabled = false;
        e.target.textContent = window.t('Revoke Inheritance');
      }
    });
  }

  // 2. Inheritor Pending Area
  const pendingCard = document.getElementById('emergency-access-inheritor-pending-card');
  const pendingList = document.getElementById('emergency-access-inheritor-pending-list');
  
  if (inheritorPendingDocs.length > 0) {
    pendingCard.classList.remove('hidden');
    pendingList.innerHTML = inheritorPendingDocs.map(d => `
        <div class="detail-panel border-bottom pb-3 mb-3">
            <p class="font-weight-bold mb-1">${window.t('From: ')}${appEscape(d.ownerEmail)}</p>
            <p class="text-muted mb-3" style="font-size: 14px;">${window.t('Access: View only')}</p>
            <div class="flex-start gap-10">
                <button class="btn-secondary btn-auto btn-decline-inv" data-id="${d.id}">${window.t('Decline')}</button>
                <button class="btn-primary btn-auto btn-accept-inv" data-id="${d.id}">${window.t('Accept')}</button>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-decline-inv').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        e.target.disabled = true;
        try {
          await updateDoc(doc(db, 'trusted_access', id), { 
              status: 'declined',
              trustedUid: auth.currentUser.uid,
              updatedAt: serverTimestamp() 
          });
          appShowToast(window.t('Invitation declined.'));
          analyticsTrack("inheritance_invitation_declined", { role:"inheritor", accessMode:"inheritance_only", permission:"view_only" });
        } catch(err) { appShowToast(window.t('Action failed.')); e.target.disabled = false; }
      });
    });
    
    document.querySelectorAll('.btn-accept-inv').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        const docItem = inheritorPendingDocs.find(item => item.id === id);
        if(!docItem) return;
        
        e.target.disabled = true;
        try {
          if (!auth.currentUser) throw new Error("Not logged in.");
          if (docItem.trustedEmail !== auth.currentUser.email) throw new Error("Email mismatch.");

          // FIX: UID-BASED INHERITANCE
          if (docItem.trustedUid && docItem.trustedUid !== auth.currentUser.uid) {
             throw new Error("Unauthorized: Invitation belongs to a different account.");
          }

          // FIX: INHERITANCE RELATIONSHIP SCHEMA
          await updateDoc(doc(db, 'trusted_access', id), { 
              status: 'active',
              trustedUid: auth.currentUser.uid,
              permission: 'view_only',
              accessMode: 'inheritance_only',
              updatedAt: serverTimestamp() 
          });

          await ensureVaultAccessDocument(docItem.ownerUid, auth.currentUser.uid);
          
          appShowToast(window.t('Invitation accepted.'));
        } catch(err) { 
          appShowToast(err.message || window.t('Action failed.')); 
          e.target.disabled = false;
        }
      });
    });
  } else {
    pendingCard.classList.add('hidden');
  }

  // 3. Inheritor Active Area
  const activeCard = document.getElementById('emergency-access-inheritor-active-card');
  const activeList = document.getElementById('emergency-access-inheritor-active-list');
  
  if (inheritorActiveDocs.length > 0) {
    activeCard.classList.remove('hidden');
    activeList.innerHTML = inheritorActiveDocs.map(d => `
        <div class="detail-panel border-bottom pb-3 mb-3">
            <p class="font-weight-bold mb-1">${appEscape(d.ownerEmail)}</p>
            <p class="text-muted mb-2" style="font-size: 14px;">${window.t('Status: Active | Access: View only')}</p>
            <button class="btn-primary btn-auto btn-access-vault" data-id="${d.id}">${window.t('Access Vault')}</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-access-vault').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.getAttribute('data-id');
        const docItem = inheritorActiveDocs.find(item => item.id === id);
        if(!docItem) return;
        e.target.disabled = true;
        e.target.textContent = window.t('Unlocking...');
        await accessInheritedVault(id, e.target);
      });
    });
  } else {
    activeCard.classList.add('hidden');
  }
}

// FIX: INHERITED VAULT RSA RETRY
// FIX: UID-BASED INHERITANCE
async function accessInheritedVault(relationshipId, btnEl) {
  try {
     const currentUser = auth.currentUser;
     if (!currentUser) throw new Error("No authenticated user.");

     analyticsTrack("inherited_vault_access_started", { role:"inheritor", accessMode:"inheritance_only", permission:"view_only" });

     const relDoc = await getDoc(doc(db, "trusted_access", relationshipId));
     if (!relDoc.exists()) throw new Error("Relationship not found.");
     
     const data = relDoc.data();

     if (data.trustedUid !== currentUser.uid) throw new Error("Unauthorized: Relationship belongs to a different user identity.");
     if (data.status !== "active") throw new Error("Inheritance is not active.");
     if (data.permission !== "view_only") throw new Error("Only VIEW ONLY permission is supported.");
     if (data.accessMode !== "inheritance_only") throw new Error("Only inheritance mode is supported.");

     const ownerUid = data.ownerUid;
     const wrappedVaultKeyBase64 = data.wrappedVaultKey;

     if (!ownerUid || typeof ownerUid !== "string") {
        throw new Error("Invalid inheritance relationship: Owner UID is missing.");
     }
     if (ownerUid === currentUser.uid) {
        throw new Error(window.t("You cannot inherit your own vault."));
     }
     if (!wrappedVaultKeyBase64 || typeof wrappedVaultKeyBase64 !== "string") {
        throw new Error("Invalid inheritance relationship: wrapped vault key is missing.");
     }

     if (wrappedVaultKeyBase64 === "pending_rsa_wrap") {
        throw new Error(window.t("Your vault access key is still being prepared."));
     }

     // FIX: INHERITED VAULT ACCESS
     // Ensure the UID-bound vault_access document is present and complete
     // before opening the Owner Vault. This also repairs legacy records.
     await ensureVaultAccessDocument(ownerUid, currentUser.uid);

     let rsaDoc = await getDoc(doc(db, "users", currentUser.uid, "vault", "rsaKey"));
     if (!rsaDoc.exists()) {
        await ensureRSAKeysProvisioned(currentUser);
        rsaDoc = await getDoc(doc(db, "users", currentUser.uid, "vault", "rsaKey"));
        if (!rsaDoc.exists()) {
            throw new Error(window.t("Your RSA keys were not found. Please log in again to provision them."));
        }
     }
     
     const { ciphertext, iv } = rsaDoc.data();
     const pkcs8Base64 = (await decryptData(base64ToUint8Array(ciphertext).buffer, base64ToUint8Array(iv), myVaultKey)).privateKey;
     
     const pkcs8Buffer = base64ToUint8Array(pkcs8Base64);
     const privateKey = await window.crypto.subtle.importKey("pkcs8", pkcs8Buffer, {name: "RSA-OAEP", hash: "SHA-256"}, false, ["decrypt"]);

     const wrappedKeyBuffer = base64ToUint8Array(wrappedVaultKeyBase64);
     
     const rawOwnerKey = await window.crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, wrappedKeyBuffer);
     const ownerKey = await window.crypto.subtle.importKey("raw", rawOwnerKey, {name: "AES-GCM"}, false, ["encrypt", "decrypt"]);
     
     // FIX: VAULT ACCESS IDENTITY
     activeVaultUid = ownerUid;
     activeVaultKey = ownerKey;
     currentRole = "inheritor";
     
     const emailDisplay = data.ownerEmail || ownerUid;
     document.getElementById('inherited-vault-owner-email').textContent = `${window.t('Owner: ')}${emailDisplay}`;
     // FIX: INHERITED VAULT ACCESS
     try {
       await subscribeToFolders();
     } catch (folderError) {
       console.error("Inherited Vault folder sync failed:", folderError);
       throw folderError;
     }

     try {
       await subscribeToCredentials();
     } catch (credentialError) {
       console.error("Inherited Vault credential sync failed:", credentialError);
       throw credentialError;
     }
     analyticsTrack("inherited_vault_access_success", { role:"inheritor", accessMode:"inheritance_only", permission:"view_only" });
     analyticsStartFeature("inherited_vault", { role:"inheritor", accessMode:"inheritance_only" });
     appShowToast(window.t("Switched to Inherited Vault"));
     showDashboardView('view-inherited-vault');
  } catch(err) {
     console.error(err);
     analyticsTrack("inherited_vault_access_failed", { role:"inheritor", accessMode:"inheritance_only", permission:"view_only", errorCode:err?.code || err?.name || "unknown_error" });
     appShowToast(err.message || window.t("Failed to access inherited vault."));
  } finally {
     if(btnEl) {
       btnEl.disabled = false;
       btnEl.textContent = window.t('Access Vault');
     }
  }
}

function renderInheritedCredentialList() {
  const statusFilter = document.getElementById('inherited-select-status')?.value || 'active';
  const folderFilter = document.getElementById('inherited-select-folder-filter')?.value || 'all';
  const sortFilter = document.getElementById('inherited-select-sort')?.value || 'updated-desc';
  
  let filtered = inheritedCredentials.filter(c => {
    const isArchived = c.archived === true;
    if (statusFilter === 'active' && isArchived) return false;
    if (statusFilter === 'archived' && !isArchived) return false;

    if (folderFilter !== 'all') {
      const cFolder = (typeof c.folderId === 'string' && c.folderId.trim()) ? c.folderId : "";
      if (cFolder !== folderFilter) return false;
    }
    return true; 
  });
  
  filtered = appSortCredentials(filtered, sortFilter);

  const countStr = filtered.length === 1 ? window.t('1 credential') : window.t('{{count}} credentials', { count: filtered.length });
  document.getElementById('inherited-credential-count').textContent = countStr;

  const tbody = document.getElementById('inherited-credentials-body');
  
  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td>${appEscape(c.platform)}</td>
      <td>${appEscape(c.username)}</td>
      <td>${appEscape(translateCategory(c.category))}</td>
      <td class="text-right">
        <button class="btn-primary btn-auto" style="min-height: 32px; padding: 6px 12px; font-size: 13px;" data-inherited-view="${c.id}">${window.t('View')}</button>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('inherited-empty-state').classList.toggle('hidden', filtered.length !== 0); 
  tbody.closest('.table-wrap').classList.toggle('hidden', filtered.length === 0);

  document.querySelectorAll('[data-inherited-view]').forEach(b => {
    b.addEventListener('click', () => core2ViewCredential(b.dataset.inheritedView));
  });
}

// ==========================================
// CORE 4: FOLDERS SYNC & LOGIC
// ==========================================

function stopFoldersSubscription() {
  if (unsubscribeFolders) {
    unsubscribeFolders();
    unsubscribeFolders = null;
  }
  folderListenerUid = null;
  core2Folders = [];
}

function subscribeToFolders() {
  return new Promise((resolve, reject) => {
    if (!auth.currentUser || !activeVaultKey || !activeVaultUid) {
      return reject(new Error("Vault is locked."));
    }
    
    stopFoldersSubscription();
    folderListenerUid = activeVaultUid;
    const foldersRef = collection(db, "users", folderListenerUid, "folders");
    
    let isFirstFolderSnap = true;
    
    unsubscribeFolders = onSnapshot(foldersRef, async (snap) => {
      const decodePromises = snap.docs.map(async (docSnap) => {
        const data = docSnap.data();
        const iv = base64ToUint8Array(data.iv);
        const ciphertext = base64ToUint8Array(data.ciphertext).buffer;
        const decrypted = await decryptData(ciphertext, iv, activeVaultKey);
        decrypted.id = docSnap.id;
        return decrypted;
      });
      
      const results = await Promise.allSettled(decodePromises);
      
      core2Folders = results.filter(r => r.status === 'fulfilled').map(r => r.value);
      
      populateFolderSelect(document.getElementById('core2-input-folder')?.value || null);
      core2PopulateFolderFilter();
      renderFoldersPage();
      
      if (isFirstFolderSnap) {
        isFirstFolderSnap = false;
        resolve();
      }
    }, (error) => {
      appShowToast(window.t("Unable to load folders")); 
      if (isFirstFolderSnap) resolve(); 
    });
  });
}

function populateFolderSelect(selectedFolderId = null) {
  const select = document.getElementById("core2-input-folder");
  if (!select) return;

  select.innerHTML = "";
  const unfiledOption = document.createElement("option");
  unfiledOption.value = "";
  unfiledOption.textContent = window.t("Unfiled");
  select.appendChild(unfiledOption);
  
  core2Folders.forEach(folder => {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name; // user created folder, do not translate
    select.appendChild(option);
  });
  
  const folderExists = core2Folders.some(folder => folder.id === selectedFolderId);
  select.value = folderExists ? selectedFolderId : "";
}

function core2PopulateFolderFilter() {
  const select = document.getElementById("core2-select-folder-filter");
  if (select) {
      const current = select.value;
      select.innerHTML = `<option value="all">${window.t('All Folders')}</option><option value="">${window.t('Unfiled')}</option>`;
      core2Folders.forEach(folder => {
          const option = document.createElement("option");
          option.value = folder.id;
          option.textContent = folder.name; // User's folder data
          select.appendChild(option);
      });
      
      const exists = current === 'all' || current === '' || core2Folders.some(f => f.id === current);
      select.value = exists ? current : 'all';
  }
  
  const inheritedSelect = document.getElementById("inherited-select-folder-filter");
  
  if (inheritedSelect) {
      const currentInh = inheritedSelect.value;
      inheritedSelect.innerHTML = `<option value="all">${window.t('All Folders')}</option><option value="">${window.t('Unfiled')}</option>`;
      
      core2Folders.forEach(folder => {
          const option = document.createElement("option");
          option.value = folder.id;
          option.textContent = folder.name; // User's folder data
          inheritedSelect.appendChild(option);
      });
      
      const existsInh = currentInh === 'all' || currentInh === '' || core2Folders.some(f => f.id === currentInh);
      inheritedSelect.value = existsInh ? currentInh : 'all';
  }
  
  if (currentRole === 'inheritor') {
      renderInheritedCredentialList();
  } else {
      core2RenderCredentialList();
  }
}

async function createNewFolder(folderName) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot create folders."));
  if (!activeVaultKey || !activeVaultUid) throw new Error("Unlock your vault before creating a folder.");
  
  const foldersRef = collection(db, "users", activeVaultUid, "folders");
  const newDocRef = doc(foldersRef);
  
  const folderData = {
    name: folderName,
    createdAt: new Date().toISOString()
  };
  
  const { ciphertext, iv } = await encryptData(folderData, activeVaultKey);
  
  try {
    await setDoc(newDocRef, {
      ciphertext: arrayBufferToBase64(ciphertext),
      iv: arrayBufferToBase64(iv),
      encryptionVersion: VAULT_ENCRYPTION_VERSION,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Update the local folder list immediately so the new folder appears
    // without waiting for the realtime snapshot to refresh.
    core2Folders = [
      ...core2Folders.filter(folder => folder.id !== newDocRef.id),
      { ...folderData, id: newDocRef.id }
    ];
    populateFolderSelect(document.getElementById('core2-input-folder')?.value || null);
    core2PopulateFolderFilter();
    renderFoldersPage();
  } catch (error) {
    if (error?.code === 'permission-denied') throw new Error(window.t("You do not have permission to create folders."));
    throw new Error(window.t("Unable to create folder. Please try again."));
  }
}

async function deleteFolder(folderId) {
  if (currentRole === "inheritor") {
    throw new Error(window.t("VIEW ONLY access. Cannot delete folders."));
  }
  if (!activeVaultKey || !activeVaultUid) {
    throw new Error("Unlock your vault before deleting a folder.");
  }
  if (!folderId) throw new Error("Folder not found.");

  if (!core2Folders.some(folder => folder.id === folderId)) {
    throw new Error("Folder not found.");
  }

  // Move credentials to Unfiled first. This operation never deletes credentials.
  const credentialsToMove = core2Credentials.filter(
    credential => credential.folderId === folderId
  );

  for (const credential of credentialsToMove) {
    await persistEncryptedCredential({
      ...credential,
      folderId: null
    });
  }

  const folderRef = doc(db, "users", activeVaultUid, "folders", folderId);

  try {
    await deleteDoc(folderRef);

    core2Folders = core2Folders.filter(folder => folder.id !== folderId);
    populateFolderSelect(document.getElementById('core2-input-folder')?.value || null);
    core2PopulateFolderFilter();
    if (core2CurrentFolderId === folderId) core2CurrentFolderId = null;
    renderFoldersPage();
    core2RenderCredentialList();
  } catch (error) {
    if (error?.code === 'permission-denied') {
      throw new Error(window.t("You do not have permission to delete folders."));
    }
    throw new Error(window.t("Unable to delete folder. Please try again."));
  }
}

// ==========================================
// CORE 4: REAL-TIME SYNC (STAGE 5)
// ==========================================

function stopCredentialsSubscription() {
  if (unsubscribeCredentials) {
    unsubscribeCredentials();
    unsubscribeCredentials = null;
  }
  credentialsListenerUid = null;
  credentialsListenerGeneration++;
}

function subscribeToCredentials() {
  return new Promise((resolve, reject) => {
    if (!auth.currentUser || !activeVaultKey || !activeVaultUid) {
      return reject(new Error("Vault is locked."));
    }
    
    stopCredentialsSubscription();
    
    const vaultUid = activeVaultUid;
    credentialsListenerUid = vaultUid;
    const currentGen = credentialsListenerGeneration;
    
    let credsRef = collection(db, "users", vaultUid, "credentials");
    // [SECURITY FILTER]: Backend-level exclusion for Inheritor
    if (currentRole === 'inheritor') {
        credsRef = query(credsRef, where("inheritEnabled", "==", true));
    }

    let isFirstSnapshot = true;
    
    const fallbackTimer = setTimeout(() => {
      if (isFirstSnapshot) {
        isFirstSnapshot = false;
        resolve();
      }
    }, 4000);
    
    unsubscribeCredentials = onSnapshot(credsRef, async (snap) => {
      if (currentGen !== credentialsListenerGeneration || !activeVaultKey) {
        return;
      }
      
      const decodePromises = snap.docs.map(async (docSnap) => {
        try {
          const data = docSnap.data();
          const iv = base64ToUint8Array(data.iv);
          const ciphertext = base64ToUint8Array(data.ciphertext).buffer;
          const decrypted = await decryptData(ciphertext, iv, activeVaultKey);
          decrypted.id = docSnap.id;
          decrypted.archived = decrypted.archived === true; 
          decrypted.folderId = typeof decrypted.folderId === "string" && decrypted.folderId.trim() ? decrypted.folderId : null;
          decrypted.inheritEnabled = data.inheritEnabled === true; // Mapped from outer document
          
          let rawCreated = 0;
          let rawUpdated = 0;
          if (data.createdAt && typeof data.createdAt.toMillis === 'function') rawCreated = data.createdAt.toMillis();
          if (data.updatedAt && typeof data.updatedAt.toMillis === 'function') rawUpdated = data.updatedAt.toMillis();
        
          decrypted.rawCreatedAt = rawCreated;
          decrypted.rawUpdatedAt = rawUpdated || rawCreated;

          // Chống lỗi "Giáo dục" đã lưu trong DB cũ
          const inverseMap = {
              'Giáo dục': 'Education',
              'Mạng xã hội': 'Social',
              'Công việc': 'Work',
              'Tài chính': 'Finance',
              'Khác': 'Other'
          };
          decrypted.category = inverseMap[decrypted.category] || decrypted.category;
          decrypted.categoryGroup = inverseMap[decrypted.categoryGroup] || decrypted.categoryGroup;

          return decrypted;
        } catch (err) {
          throw err;
        }
      });
      
      const results = await Promise.allSettled(decodePromises);
      
      if (currentGen !== credentialsListenerGeneration || !activeVaultKey) {
        return;
      }
      
      const newCredentials = [];
      let errorCount = 0;
      
      for (const result of results) {
        if (result.status === 'fulfilled') {
          newCredentials.push(result.value);
        } else {
          errorCount++;
        }
      }
      
      if (currentRole === 'inheritor') {
          inheritedCredentials = newCredentials;
      } else {
          core2Credentials = newCredentials;
      }
      
      if (errorCount > 0) {
        appShowToast(window.t("{{count}} credential(s) could not be decrypted.", { count: errorCount }));
      }

      const activeScreen = document.querySelector('.dashboard-view.active')?.id;
      
      if (core2CurrentId) {
        const stillExists = getActiveCredentials().find(c => c.id === core2CurrentId);
        
        if (!stillExists) {
          if (activeScreen === 'view-core2-detail' || activeScreen === 'view-core2-form') {
            appShowToast(window.t("Credential was removed."));
            
            if (currentRole === 'inheritor') showDashboardView('view-inherited-vault');
            else showDashboardView('view-core2-list');
            core2CloseConfirm();
          }
          core2CurrentId = null;
        } else if (activeScreen === 'view-core2-detail') {
          core2ViewCredential(core2CurrentId);
        }
      }
      
      if (core3CurrentCredentialId) {
        const stillExists = core2Credentials.find(c => c.id === core3CurrentCredentialId);
        
        if (!stillExists) {
          if (activeScreen === 'view-core3-detail' || activeScreen === 'view-core3-history') {
            appShowToast(window.t("Credential was removed."));
            showDashboardView('view-core3-search');
          }
          core3CurrentCredentialId = null;
          core3CurrentHistoryId = null;
        } else {
          if (activeScreen === 'view-core3-detail') {
            core3ViewSelectedCredential(core3CurrentCredentialId);
          } else if (activeScreen === 'view-core3-history' && core3CurrentHistoryId) {
            core3OpenHistory(core3CurrentHistoryId);
          }
        }
      }
      
      if (currentRole === 'inheritor') {
          renderInheritedCredentialList();
          if (activeScreen === 'view-core3-search') core3Search();
      } else {
          core2RenderCredentialList();
          if (activeScreen === 'view-core3-search') core3Search();
      }
      if (activeScreen === 'view-folder-detail') renderFolderDetailPage();
      if (activeScreen === 'view-folders') renderFoldersPage();
      appRenderDashboard();
      core3PopulatePlatformFilter();
      core3PopulateCategoryFilter();
      
      if (isFirstSnapshot) {
        isFirstSnapshot = false;
        clearTimeout(fallbackTimer);
        resolve();
      }
      
    }, (error) => {
      if (error.code === 'permission-denied') {
        appShowToast(window.t("Access Denied to credentials."));
        
        if (currentRole === 'inheritor') inheritedCredentials = [];
        else core2Credentials = [];
        refreshAllViews();
      } else {
        appShowToast(window.t("Connection error. Sync paused."));
      }
      if (isFirstSnapshot) {
        isFirstSnapshot = false;
        clearTimeout(fallbackTimer);
        reject(error);
      }
    });
  });
}

// ==========================================
// CORE 4: FIRESTORE CRUD OPERATIONS
// ==========================================

async function persistEncryptedCredential(credentialObj) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot modify credentials."));
  if (!activeVaultKey || !activeVaultUid) throw new Error("Vault is locked. Please unlock it first.");
  
  const { ciphertext, iv } = await encryptData(credentialObj, activeVaultKey);
  const docRef = doc(db, "users", activeVaultUid, "credentials", credentialObj.id);
  
  await setDoc(docRef, {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv),
    encryptionVersion: VAULT_ENCRYPTION_VERSION,
    inheritEnabled: credentialObj.inheritEnabled === true, // Expose for rule filtering
    updatedAt: serverTimestamp()
  }, { merge: true });
}

async function createCredential(formData) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot add credentials."));
  
  if (!activeVaultKey || !activeVaultUid) {
    throw new Error("Vault is locked. Please unlock it first.");
  }
  
  const credsRef = collection(db, "users", activeVaultUid, "credentials");
  const newDocRef = doc(credsRef);
  
  const credential = {
    id: newDocRef.id,
    platform: formData.platform,
    username: formData.username,
    password: formData.password,
    website: formData.website || '',
    category: formData.category,
    categoryGroup: formData.categoryGroup,
    notes: formData.notes || '',
    folderId: formData.folderId || null,
    status: 'active',
    archived: false,
    updated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    history: [],
    inheritEnabled: formData.inheritEnabled === true
  };
  
  const { ciphertext, iv } = await encryptData(credential, activeVaultKey);
  
  await setDoc(newDocRef, {
    ciphertext: arrayBufferToBase64(ciphertext),
    iv: arrayBufferToBase64(iv),
    encryptionVersion: VAULT_ENCRYPTION_VERSION,
    inheritEnabled: credential.inheritEnabled, // Expose for rule filtering
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  
  core2LastSavedId = credential.id;
}

async function updateCredential(id, formData) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot edit credentials."));
  
  const c = core2Credentials.find(item => item.id === id);
  if (!c) throw new Error("Credential not found.");
  
  const updatedCredential = { ...c };
  
  if(updatedCredential.password !== formData.password) {
    updatedCredential.history = updatedCredential.history || [];
    
    updatedCredential.history.unshift({ 
      password: updatedCredential.password, 
      date: new Date().toISOString() 
    });
    
    if (updatedCredential.history.length > 10) {
      updatedCredential.history.length = 10;
    }
  }
  
  Object.assign(updatedCredential, {
    platform: formData.platform,
    username: formData.username,
    password: formData.password,
    website: formData.website || '',
    category: formData.category,
    categoryGroup: formData.categoryGroup,
    notes: formData.notes || '',
    folderId: formData.folderId || null,
    inheritEnabled: formData.inheritEnabled === true, // Apply Explicitly
    updated: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  });
  
  await persistEncryptedCredential(updatedCredential);
  core2LastSavedId = id;
}

async function archiveCredential(id) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot archive credentials."));
  
  const c = core2Credentials.find(item => item.id === id);
  if (!c) throw new Error("Credential not found.");
  
  const updatedCredential = { ...c, archived: true };
  await persistEncryptedCredential(updatedCredential);
}

async function restoreCredential(id) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot restore credentials."));
  
  const c = core2Credentials.find(item => item.id === id);
  if (!c) throw new Error("Credential not found.");
  
  const updatedCredential = { ...c, archived: false };
  await persistEncryptedCredential(updatedCredential);
}

async function deleteCredential(id) {
  if (currentRole === "inheritor") throw new Error(window.t("VIEW ONLY access. Cannot delete credentials."));
  
  if (!activeVaultKey || !activeVaultUid) {
    throw new Error("Vault is locked. Please unlock it first.");
  }
  
  const docRef = doc(db, "users", activeVaultUid, "credentials", id);
  await deleteDoc(docRef);
}

// ==========================================
// INACTIVITY TRACKER FUNCTIONS
// ==========================================
function updateLastActivityTime(e) {
  if (e && !e.isTrusted) return;
  lastActivityTime = Date.now();
}

function onMouseMoveThrottled(e) {
  if (!e.isTrusted) return;
  if (!mouseMoveTimeout) {
    updateLastActivityTime();
    
    mouseMoveTimeout = setTimeout(() => { mouseMoveTimeout = null; }, 500);
  }
}

function onVisibilityChange() {
  if (document.visibilityState === 'visible') checkInactivity();
}

function onWindowFocus() {
  checkInactivity();
}

function startInactivityTracking() {
  lastActivityTime = Date.now();
  sessionExpiredByInactivity = false;
  if (isTrackingActivity) return;
  
  isTrackingActivity = true;

  document.addEventListener('pointerdown', updateLastActivityTime);
  document.addEventListener('keydown', updateLastActivityTime);
  document.addEventListener('touchstart', updateLastActivityTime, { passive: true });
  document.addEventListener('scroll', updateLastActivityTime, { passive: true });
  
  document.addEventListener('mousemove', onMouseMoveThrottled);
  document.addEventListener('visibilitychange', onVisibilityChange);
  window.addEventListener('focus', onWindowFocus);

  activityCheckInterval = setInterval(checkInactivity, 10000); 
}

function stopInactivityTracking() {
  stopAutoWrapChecker();
  if (!isTrackingActivity) return;
  
  isTrackingActivity = false;

  document.removeEventListener('pointerdown', updateLastActivityTime);
  document.removeEventListener('keydown', updateLastActivityTime);
  document.removeEventListener('touchstart', updateLastActivityTime);
  document.removeEventListener('scroll', updateLastActivityTime);
  document.removeEventListener('mousemove', onMouseMoveThrottled);
  document.removeEventListener('visibilitychange', onVisibilityChange);
  window.removeEventListener('focus', onWindowFocus);

  clearInterval(activityCheckInterval);
  
  if (mouseMoveTimeout) {
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = null;
  }
}

async function checkInactivity() {
  if (!isTrackingActivity) return;
  
  const now = Date.now();
  if (now - lastActivityTime >= INACTIVITY_LIMIT) {
    sessionExpiredByInactivity = true;
    stopInactivityTracking();
    lockVault();
    
    try {
      await signOut(auth);
    } catch (err) {
      handleLogoutUI();
    }
  }
}

// ==========================================
// FIREBASE AUTH STATE LISTENER (Observer)
// ==========================================
onAuthStateChanged(auth, async (user) => {
  if (manualLoginInProgress || vaultUnlockInProgress || isSignupFlow || isRecoveryFlow) return; 

  const transitionId = ++authTransitionId;
  const activeScreen = document.querySelector('.screen.active')?.id;

  if (!user) {
    clearDashboardSessionMarker();
    lockVault();
    stopInheritanceSubscription();

    if (transitionId === authTransitionId) {
      const activePublicScreen = document.querySelector('.screen.active')?.id;
      const isPublicAuthScreen =
        activePublicScreen === 'screen-login' ||
        activePublicScreen === 'screen-create-account' ||
        activePublicScreen === 'screen-check-email' ||
        activePublicScreen === 'screen-forgot-password' ||
        activePublicScreen === 'screen-recovery-setup' ||
        activePublicScreen === 'screen-set-new-pwd';

      // Firebase can emit its initial null state after Landing navigation.
      // Never let that transient state immediately replace a public
      // Login/Sign-up/Recovery screen with the Landing page.
      if (!isPublicAuthScreen) {
        handleLogoutUI();
      }
    }
    return;
  }

  if (!user.emailVerified) {
    if (transitionId === authTransitionId) showScreen('screen-check-email');
    return;
  }

  // Devices & Access initialization is non-blocking.
  initializeDeviceAccess(user).catch((error) => {
    console.warn('[Devices & Access] Initialization skipped:', error?.message || error);
  });

  // Analytics admin discovery is non-blocking.
  // It never blocks or changes the normal CHECK KEY startup flow.
  initializeAnalyticsDashboard().catch((error) => {
    console.warn(
      '[Analytics Dashboard] Initialization skipped:',
      error?.message || error
    );
  });

  subscribeToInheritance(user);

  if (activeVaultUid && activeVaultUid !== user.uid && currentRole !== 'inheritor') {
    lockVault();
  }

  if (activeVaultKey) {
    if (transitionId === authTransitionId) {
      if (!activeScreen || activeScreen === 'screen-startup' || activeScreen === 'screen-login' || activeScreen === 'screen-create-account' ||
          activeScreen === 'screen-vault-locked' || activeScreen === 'screen-account-error') {
        
        showScreen('screen-dashboard');
        showDashboardView('view-dashboard');
        markDashboardSessionActive();
      }
      startInactivityTracking();
      startAutoWrapChecker();
    }
    return;
  }

  // The vault key is intentionally cleared on a page reload, so lock the
  // vault immediately instead of waiting for the account-deletion API check.
  // The deletion check continues in the background and can still redirect
  // to the pending-deletion screen when necessary.
  if (transitionId === authTransitionId) {
    showScreen('screen-vault-locked');
  }

  try {
    const delData = await fetchVercelAPI('account-deletion', 'GET');
    if (transitionId !== authTransitionId) return;
    
    if (delData.pending) {
       renderPendingDeletionScreen(delData);
       return;
    }
    
  } catch (err) {
    if (transitionId === authTransitionId) {
       console.error("Startup Account check failed:", err.message || err);
       showScreen('screen-account-error');
    }
  }
});

// ==========================================
// CORE FIREBASE FUNCTIONS & HELPERS
// ==========================================

async function hashStringSHA256(str) {
  const encoder = new TextEncoder();
  
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashSecurityAnswer(text) {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  const saltHex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return await verifyHash(text, saltHex, true);
}

async function verifyHash(text, saltHex, returnSaltObj = false) {
  const encoder = new TextEncoder();
  
  const data = encoder.encode(text + saltHex);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  if (returnSaltObj) {
    return { hash: hashHex, salt: saltHex };
  }
  return hashHex;
}

// Xử lý Đăng ký
async function handleSignUp(e) {
  e.preventDefault();
  const btn = document.querySelector('#form-signup button[type="submit"]');
  
  btn.disabled = true;
  btn.textContent = window.t('Processing...');
  clearAllErrors();

  const email = document.getElementById('reg-email').value.trim();
  const pwd = document.getElementById('reg-master-pwd').value;
  const question = document.getElementById('reg-sec-question').value;
  const answer = document.getElementById('reg-sec-answer').value.trim().toLowerCase();

  try {
    isSignupFlow = true; 
    const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
    
    const { hash, salt } = await hashSecurityAnswer(answer);
    
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      securityQuestion: question,
      securityAnswerHash: hash,
      securityAnswerSalt: salt,
      createdAt: serverTimestamp()
    });
    
    const normalizedEmail = email.trim().toLowerCase();
    const emailHash = await hashStringSHA256(normalizedEmail);
    await setDoc(doc(db, "public_directory", emailHash), {
      uid: userCredential.user.uid,
      email: normalizedEmail,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });

    await sendEmailVerification(userCredential.user);

    tempSignupMasterPassword = pwd; // Luu tam thoi cho first-vault setup o buoc nhap PIN ke tiep

    showScreen('screen-recovery-setup');
    
  } catch (error) {
    isSignupFlow = false;
    handleFirebaseError(error, 'reg-email');
  } finally {
    btn.disabled = false;
    btn.textContent = window.t('Create account');
  }
}

function renderPendingDeletionScreen(data) {
  const dateEl = document.getElementById('pending-deletion-date');
  
  const activeArea = document.getElementById('pending-deletion-active-area');
  const expiredArea = document.getElementById('pending-deletion-expired-area');
  
  if (data.canCancel) {
    activeArea.classList.remove('hidden');
    expiredArea.classList.add('hidden');
    
    const localDate = new Date(data.deleteAfter).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' });
    dateEl.textContent = localDate;
    
  } else {
    activeArea.classList.add('hidden');
    expiredArea.classList.remove('hidden');
  }
  showScreen('screen-pending-deletion');
}

// ==========================================
// LOCKOUT HELPERS
// ==========================================

function showLockoutModal(lockedUntilTime, targetUid) {
  console.log("[Login Lockout] Opening lockout modal");
  const modal = document.getElementById('lockoutModal');
  const timerEl = document.getElementById('lockoutCountdown');
  const pwdInput = document.getElementById('login-master-pwd');
  const btn = document.querySelector('#form-login button[type="submit"]');

  modal.classList.remove('hidden');
  modal.style.display = 'block'; 
  console.log("[Login Lockout] Countdown started");

  pwdInput.disabled = true;
  if(btn) {
      btn.disabled = true;
      btn.textContent = window.t('Log in');
  }

  if (window.lockoutTimerInterval) clearInterval(window.lockoutTimerInterval);

  const updateUI = () => {
     const now = Date.now();
     const remain = lockedUntilTime - now;

     if (remain <= 0) {
        clearInterval(window.lockoutTimerInterval);
        window.lockoutTimerInterval = null;
        console.log("[Login Lockout] Lockout expired");
        modal.classList.add('hidden');
        modal.style.display = 'none';
        pwdInput.disabled = false;
        if(btn) {
            btn.disabled = false;
            btn.textContent = window.t('Log in');
        }
        manualLoginInProgress = false;
        document.getElementById('err-login-master-pwd').textContent = '';
        if (targetUid) {
            try { updateDoc(doc(db, "users", targetUid, "security", "loginLockout"), { failedLoginAttempts: 0, lockedUntil: null }); } catch(e){}
        }
        return;
     }

     const h = Math.floor(remain / (1000 * 60 * 60)).toString().padStart(2, '0');
     const m = Math.floor((remain % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
     const s = Math.floor((remain % (1000 * 60)) / 1000).toString().padStart(2, '0');
     
     timerEl.textContent = `${h}:${m}:${s}`;
  };

  updateUI();
  window.lockoutTimerInterval = setInterval(updateUI, 1000);
}

async function processFailedAttempt(targetUid) {
   const lockoutRef = doc(db, "users", targetUid, "security", "loginLockout");
   try {
      const snap = await getDoc(lockoutRef);
      let attempts = 1;
      if (snap.exists()) {
         attempts = (snap.data().failedLoginAttempts || 0) + 1;
      }
      
      console.log(`[Login Lockout] Invalid credentials`);
      console.log(`[Login Lockout] Failed attempts: ${attempts}/5`);

      if (attempts >= 5) {
         console.log("[Login Lockout] ACCOUNT IS LOCKED");
         const lockTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
         console.log(`[Login Lockout] Locked until: ${lockTime}`);
         await setDoc(lockoutRef, {
            failedLoginAttempts: 5,
            lockedUntil: lockTime.getTime()
         }, { merge: true });
         showLockoutModal(lockTime.getTime(), targetUid);
         return true; 
      } else {
         await setDoc(lockoutRef, {
            failedLoginAttempts: attempts,
            lockedUntil: null
         }, { merge: true });
         showError('login-master-pwd', window.t('Invalid email or master password. Attempt {{attempt}}/5', { attempt: attempts }));
         return false;
      }
   } catch(err) {
      console.warn("[Login Lockout] Failed to process attempt (Permission/Network):", err);
      showError('login-master-pwd', window.t('Invalid email or master password.'));
      return false;
   }
}

// Xử lý Đăng nhập
async function handleLogin(e) {
  e.preventDefault();
  const btn = document.querySelector('#form-login button[type="submit"]');
  btn.disabled = true;
  btn.textContent = window.t('Logging in...');
  clearAllErrors();

  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pwdInput = document.getElementById('login-master-pwd');
  const pwd = pwdInput.value;
  
  if (!email || !isValidEmail(email)) {
    showError('login-email', window.t('Please enter a valid email.'));
    btn.disabled = false;
    btn.textContent = window.t('Log in');
    return;
  }
  if (!pwd) {
    showError('login-master-pwd', window.t('Master password is required.'));
    btn.disabled = false;
    btn.textContent = window.t('Log in');
    return;
  }

  manualLoginInProgress = true;
  analyticsTrack("login_started", { authMethod: "email_password" });
  
  // =====================================
  // 1. NON-BLOCKING LOCKOUT CHECK
  // =====================================
  let targetUid = null;
  console.log("[Login Lockout] Checking lockout");
  try {
     const emailHash = await hashStringSHA256(email);
     const pubDirRef = doc(db, "public_directory", emailHash);
     const pubSnap = await getDoc(pubDirRef);
     if (pubSnap.exists()) {
         targetUid = pubSnap.data().uid;
     }
  } catch (err) {
     console.warn("[Login Lockout] Lockout lookup failed:", err);
  }

  if (targetUid) {
     try {
        const lockoutRef = doc(db, "users", targetUid, "security", "loginLockout");
        const userSnap = await getDoc(lockoutRef);
        if (userSnap.exists()) {
            const data = userSnap.data();
            let lockedUntilTime = 0;
            if (data.lockedUntil && typeof data.lockedUntil.toMillis === 'function') {
                lockedUntilTime = data.lockedUntil.toMillis();
            } else if (data.lockedUntil instanceof Date) {
                lockedUntilTime = data.lockedUntil.getTime();
            } else if (typeof data.lockedUntil === 'number') {
                lockedUntilTime = data.lockedUntil;
            }

            if (lockedUntilTime > Date.now()) {
                console.log("[Login Lockout] ACCOUNT IS LOCKED");
                console.log(`[Login Lockout] Locked until: ${new Date(lockedUntilTime)}`);
                showLockoutModal(lockedUntilTime, targetUid);
                return; 
            }
        }
     } catch(err) {
        console.warn("[Login Lockout] Permission denied reading lockout document.", err);
     }
  }
  
  // =====================================
  // 2. FIREBASE AUTH
  // =====================================
  let userCredential;
  try {
    console.log("[Login Debug] Calling Firebase Authentication");
    console.log(`[Login Debug] Email: ${email}`);

    userCredential = await signInWithEmailAndPassword(auth, email, pwd);
    
    console.log("[Login Debug] Firebase Authentication SUCCESS");
    console.log(`[Login Debug] UID: ${userCredential.user.uid}`);

    // RESET LOCKOUT ON SUCCESS
    if (targetUid) {
       try {
          console.log("[Login Lockout] Successful login");
          console.log("[Login Lockout] Resetting failed attempts");
          await setDoc(doc(db, "users", targetUid, "security", "loginLockout"), {
             failedLoginAttempts: 0,
             lockedUntil: null
          }, { merge: true });
       } catch(e) { console.warn("[Login Lockout] Failed to reset lockout state", e); }
    }
    
    await reload(userCredential.user);
    
    if (!userCredential.user.emailVerified) {
      try {
        await sendEmailVerification(userCredential.user);
      } catch (verificationError) {
        handleFirebaseError(verificationError, 'login-email');
      }
      await signOut(auth); 
       analyticsTrack("login_unverified", { authMethod: "email_password" });
      showScreen('screen-check-email');
      document.getElementById('form-login').reset();
      return;
    }
    
    // Refresh Firebase ID token để rule request.auth.token.email_verified == true dc cap nhat cho Firestore client
    await userCredential.user.getIdToken(true);

    subscribeToInheritance(userCredential.user);

    let delData;
    try {
      // OPTIMIZATION: Chạy song song kiểm tra deletion và giải mã Vault để tăng tốc login (tránh tình trạng waterfall)
      const results = await Promise.allSettled([
          fetchVercelAPI('account-deletion', 'GET'),
          initializeOrUnlockVault(userCredential.user, pwd)
      ]);
      
      if (results[0].status === 'rejected') {
          showError('login-master-pwd', window.t('Unable to verify account status. Please try again.'));
          await signOut(auth);
          return;
      }
      
      if (results[1].status === 'rejected') {
          throw results[1].reason; // Ném lỗi (như sai mật khẩu) ra catch block ở ngoài
      }
      
      delData = results[0].value;
    } catch(err) {
      throw err; // Quăng ngược về main catch block
    }

    if (delData && delData.pending) {
      pwdInput.value = '';
      renderPendingDeletionScreen(delData);
      return;
    }

    // FIX: LOGIN RSA INITIALIZATION
    try {
      await ensureRSAKeysProvisioned(userCredential.user);
    } catch (e) {
      console.warn("RSA provisioning failed, continuing login:", e);
    }
    
    await subscribeToCredentials();
    await subscribeToFolders();

    initializeDeviceAccess(userCredential.user).catch((error) => {
      console.warn('[Devices & Access] Post-login initialization skipped:', error?.message || error);
    });
    
    startAutoWrapChecker();
    startInactivityTracking();
    
    // Immediately show dashboard and reset login form
    analyticsTrack("login_success", { authMethod: "email_password" });
    showScreen('screen-dashboard');
    showDashboardView('view-dashboard');
    markDashboardSessionActive();

    // FIX: onAuthStateChanged() intentionally skips its work while
    // manualLoginInProgress is true. Initialize Analytics explicitly
    // after a successful manual login so the Analytics nav appears
    // immediately without requiring a page reload.
    initializeAnalyticsDashboard().catch((error) => {
      console.warn(
        '[Analytics Dashboard] Post-login initialization skipped:',
        error?.message || error
      );
    });

    document.getElementById('form-login').reset();
    pwdInput.value = '';

  } catch (error) {
    analyticsTrack("login_failed", {
      authMethod: "email_password",
      errorCode: error?.code || error?.name || "unknown_error"
    });
    console.log("[Login Debug] Firebase Authentication FAILED or Vault Error");
    console.log(`[Login Debug] Error code: ${error.code}`);

    try { await signOut(auth); } catch(e){}

    if (error.code === 'auth/too-many-requests') {
        console.log("[Login Lockout] Firebase throttled request");
        console.log("[Login Lockout] NOT counting as failed password attempt");
        showError('login-master-pwd', window.t('Too many login requests. Please try again later.'));
    }
    else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        if (targetUid) {
           const isLocked = await processFailedAttempt(targetUid);
           if (isLocked) {
               return; 
           }
        } else {
           showError('login-master-pwd', window.t('Invalid email or master password.'));
        }
    } 
    else if (error.code && error.code.startsWith('auth/')) {
        handleFirebaseError(error, 'login-email');
    } 
    else {
        showError('login-master-pwd', window.t('Incorrect master password or decryption failed.'));
    }
  } finally {
    if (!window.lockoutTimerInterval) {
       manualLoginInProgress = false;
       btn.disabled = false;
       btn.textContent = window.t('Log in');
    }
  }
}

async function handleVaultUnlock(e) {
  e.preventDefault();
  const pwdInput = document.getElementById('vault-unlock-pwd');
  
  const pwd = pwdInput.value;
  const btn = document.querySelector('#form-vault-unlock button[type="submit"]');
  
  clearAllErrors();
  
  if (!pwd) {
    showError('vault-unlock-pwd', window.t('Master password is required.'));
    return;
  }
  
  btn.disabled = true;
  
  btn.textContent = window.t('Unlocking...');
  
  vaultUnlockInProgress = true; 
  analyticsTrack("vault_unlock_started", { source: "locked_screen" });

  try {
    const user = auth.currentUser;
    
    if (!user) throw new Error("No active session.");
    
    const credential = EmailAuthProvider.credential(user.email, pwd);
    await reauthenticateWithCredential(user, credential);
    
    let delData;
    
    try {
      delData = await fetchVercelAPI('account-deletion', 'GET');
    } catch (apiErr) {
      showError('vault-unlock-pwd', window.t('Unable to verify account status. Please try again.'));
      return;
    }
    
    if (delData.pending) {
      pwdInput.value = '';
      renderPendingDeletionScreen(delData);
      return;
    }

    await initializeOrUnlockVault(user, pwd);

    // FIX: LOGIN RSA INITIALIZATION
    try {
      await ensureRSAKeysProvisioned(user);
    } catch (e) {
      console.warn("RSA provisioning failed, continuing unlock:", e);
    }

    await subscribeToCredentials();
    await subscribeToFolders();

    initializeDeviceAccess(user).catch((error) => {
      console.warn('[Devices & Access] Post-unlock initialization skipped:', error?.message || error);
    });
    
    startAutoWrapChecker();
    startInactivityTracking();

    analyticsTrack("vault_unlock_success", { source: "locked_screen" });
    showScreen('screen-dashboard');
    showDashboardView('view-dashboard');
    markDashboardSessionActive();

  } catch(error) {
    analyticsTrack("vault_unlock_failed", {
      source: "locked_screen",
      errorCode: error?.code || error?.name || "unknown_error"
    });
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
      showError('vault-unlock-pwd', window.t('Incorrect master password.'));
    } else {
      showError('vault-unlock-pwd', window.t('Error unlocking vault. Please try again.'));
    }
  } finally {
    vaultUnlockInProgress = false;
    pwdInput.value = '';
    btn.disabled = false;
    
    btn.textContent = window.t('Unlock Vault');
  }
}

async function handleScheduleAccountDeletion(e) {
  e.preventDefault();
  
  const pwdInput = document.getElementById('delete-master-pwd');
  const pwd = pwdInput.value;
  const confirmText = document.getElementById('delete-confirmation-text').value;
  const btn = document.getElementById('btn-submit-delete-account');
  const errorEl = document.getElementById('err-delete-account');
  
  errorEl.textContent = '';
  if (confirmText !== 'DELETE') return;

  btn.disabled = true;
  btn.textContent = window.t('Scheduling...');
  
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("No active user");
    
    const credential = EmailAuthProvider.credential(user.email, pwd);
    await reauthenticateWithCredential(user, credential);
    
    // FIX: ACCOUNT DELETION CLEANUP
    await fetchVercelAPI('account-deletion', 'POST', { action: 'schedule' });
    
    document.getElementById('modal-delete-account').classList.add('hidden');
    appShowToast(window.t('Account scheduled for deletion.'));
    
    await handleLogout();

  } catch (error) {
    if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
      errorEl.textContent = window.t('Incorrect master password.');
    } else if (error.code === 'auth/too-many-requests') {
      errorEl.textContent = window.t('Too many attempts. Try again later.');
    } else {
      errorEl.textContent = error.message || window.t('Failed to schedule deletion.');
    }
  } finally {
    pwdInput.value = '';
    btn.disabled = false;
    btn.textContent = window.t('Schedule Account Deletion');
  }
}

async function handleCancelAccountDeletion() {
  const btn = document.getElementById('btn-cancel-deletion');
  btn.disabled = true;
  btn.textContent = window.t('Cancelling...');
  
  try {
    await fetchVercelAPI('account-deletion', 'POST', { action: 'cancel' });
    appShowToast(window.t('Deletion cancelled. Please log in again.'));
    await handleLogout();
    
  } catch(error) {
    alert(error.message || window.t('Unable to cancel deletion. Please try again.'));
    btn.disabled = false;
    
    btn.textContent = window.t('Cancel Account Deletion');
  }
}

async function handleLogout() {
  clearDashboardSessionMarker();
  hideAnalyticsDashboardAccess();
  sessionExpiredByInactivity = false;
  stopInactivityTracking();
  analyticsTrack("logout", { reason: "user_action" });
  
  lockVault();
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error", error);
  }
}

function handleLogoutUI() {
  clearDashboardSessionMarker();
  hideAnalyticsDashboardAccess();
  stopInactivityTracking();

  if (!isSignupFlow && !isRecoveryFlow) {
      if (sessionExpiredByInactivity) {
          showScreen('screen-login');
      } else {
          showLandingPage();
      }
  }
  document.getElementById('form-signup').reset();
  document.getElementById('form-login').reset();
  document.getElementById('form-vault-unlock').reset();
  document.getElementById('form-change-pwd').reset();
  document.getElementById('form-sec-verification').reset();
  document.getElementById('form-set-new-pwd').reset();
  document.getElementById('form-recovery-setup')?.reset();
  document.getElementById('form-forgot-password')?.reset();
  
  updateChecklist('', 'reg');
  updateChecklist('', 'new');
  document.querySelector('#form-signup button[type="submit"]').disabled = true;
  
  document.querySelector('#form-set-new-pwd button[type="submit"]').disabled = true;
  
  const loginBtn = document.querySelector('#form-login button[type="submit"]');
  if(loginBtn) {
      loginBtn.disabled = false;
      
      loginBtn.textContent = window.t('Log in');
  }

  tempAuthData = { reauthenticated: false, timestamp: null, userData: null, currentPwdHash: null, pwdSalt: null };
  
  tempSignupRecoveryPin = null;
  tempSignupMasterPassword = null;
  tempRecoveryMetadata = null; 

  const qDisplay = document.getElementById('display-sec-question');
  if (qDisplay) qDisplay.textContent = window.t('What was the name of your first pet?');
  
  if (sessionExpiredByInactivity) {
    const modal = document.getElementById('modal-session-expired');
    modal.classList.remove('hidden');
    document.getElementById('btn-modal-login-again').focus();
  }
}

function handleFirebaseError(error, defaultField) {
  const code = error.code;
  
  if (code === 'auth/email-already-in-use') {
    showError(defaultField, window.t('Email is already registered.'));
    
  } else if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/user-not-found') {
    if (defaultField === 'current-pwd') {
      showError(defaultField, window.t('Incorrect current password.'));
      
    } else {
      showError(defaultField, window.t('Invalid email or master password.'));
      
    }
  } else if (code === 'auth/network-request-failed') {
    showError(defaultField, window.t('Network connection failed. Please try again.'));
    
  } else if (code === 'auth/too-many-requests') {
    showError(defaultField, window.t('Too many login requests. Please try again later.'));
    
  } else if (error.message && error.message.includes('missing or insufficient permissions')) {
    showError(defaultField, window.t('Database permission denied.'));
    
  } else {
    showError(defaultField, window.t('Error ') + (code ? `(${code})` : '') + ': ' + error.message);
    
  }
}

// ==========================================
// MỚI: HÀM TIỆN ÍCH
// ==========================================
function appNormalizeString(str) {
  if (!str) return '';
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

function core2CheckDuplicate(platform, username, excludeId = null) {
  const normPlatform = appNormalizeString(platform);
  const normUsername = appNormalizeString(username);
  
  if (!normPlatform || !normUsername) return null;

  for (const c of getActiveCredentials()) {
    if (excludeId && c.id === excludeId) continue;
    
    if (appNormalizeString(c.platform) === normPlatform && appNormalizeString(c.username) === normUsername) {
      return c;
      
    }
  }
  return null;
}

function core2CloseDuplicateModal() {
  document.getElementById('modal-duplicate-warning').classList.add('hidden');
  core2PendingSaveCallback = null;
}

function appGetSafeUrl(urlString) {
  if (!urlString) return null;
  let trimmed = urlString.trim();
  if (trimmed === '') return null;
  
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = 'https://' + trimmed;
    
  }
  try {
    const urlObj = new URL(trimmed);
    
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return null;
      
    }
    return urlObj.toString();
  } catch (e) {
    return null;
    
  }
}

function appFormatTimestamp(millis) {
  if (!millis) return window.t('Not available');
  try {
    const d = new Date(millis);
    
    if (isNaN(d.getTime())) return window.t('Not available');
    return new Intl.DateTimeFormat(navigator.language || 'en-GB', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(d);
    
  } catch(e) {
    return window.t('Not available');
  }
}

function appSortCredentials(list, sortType) {
  const sorted = [...list];
  
  sorted.sort((a, b) => {
    if (sortType === 'updated-desc') {
      return b.rawUpdatedAt - a.rawUpdatedAt;
    } else if (sortType === 'updated-asc') {
      return a.rawUpdatedAt - b.rawUpdatedAt;
    } else if (sortType === 'name-asc') {
      const nameA = (a.platform || '').trim();
      const nameB = (b.platform || '').trim();
      return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
    } else if (sortType === 'name-desc') {
      const nameA = (a.platform || '').trim();
      const nameB = (b.platform || '').trim();
      return nameB.localeCompare(nameA, undefined, { sensitivity: 'base' });
    }
    return 0;
  });
  
  return sorted;
}

function renderWebsiteLink(containerId, websiteStr, platformName) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  
  const safeUrl = appGetSafeUrl(websiteStr);
  if (safeUrl) {
    const link = document.createElement('a');
    link.href = safeUrl;
    link.target = '_blank';
    
    link.rel = 'noopener noreferrer';
    link.className = 'website-link';
    link.setAttribute('aria-label', `Open ${platformName} in a new tab`);
    
    const span = document.createElement('span');
    
    span.textContent = websiteStr;
    link.appendChild(span);

    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    iconSvg.setAttribute('viewBox', '0 0 24 24');
    iconSvg.setAttribute('fill', 'none');
    iconSvg.setAttribute('stroke', 'currentColor');
    iconSvg.setAttribute('stroke-width', '2');
    
    iconSvg.setAttribute('stroke-linecap', 'round');
    iconSvg.setAttribute('stroke-linejoin', 'round');
    iconSvg.setAttribute('aria-hidden', 'true');
    iconSvg.classList.add('external-link-icon');
    iconSvg.innerHTML = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>';
    
    link.appendChild(iconSvg);
    
    link.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    container.appendChild(link);
    
  } else {
    container.textContent = websiteStr || '—';
    
  }
}

// ==========================================
// VALIDATION & UI LOGIC
// ==========================================

function validateMasterPassword(password) {
  return {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
}

function updateChecklist(password, prefix) {
  const criteria = validateMasterPassword(password);
  const elLen = document.getElementById(`${prefix}-req-length`);
  const elLow = document.getElementById(`${prefix}-req-lower`);
  const elUpp = document.getElementById(`${prefix}-req-upper`);
  const elNum = document.getElementById(`${prefix}-req-number`);
  const elSpe = document.getElementById(`${prefix}-req-special`);
  if (elLen) elLen.className = criteria.length ? 'valid' : '';
  if (elLow) elLow.className = criteria.lower ? 'valid' : '';
  if (elUpp) elUpp.className = criteria.upper ? 'valid' : '';
  if (elNum) elNum.className = criteria.number ? 'valid' : '';
  if (elSpe) elSpe.className = criteria.special ? 'valid' : '';
  return Object.values(criteria).every(Boolean);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCreateAccountForm() {
  const email = document.getElementById('reg-email').value.trim();
  const pwd = document.getElementById('reg-master-pwd').value;
  const confirmPwd = document.getElementById('reg-confirm-pwd').value;
  const question = document.getElementById('reg-sec-question').value;
  const answer = document.getElementById('reg-sec-answer').value.trim();

  const isPwdValid = updateChecklist(pwd, 'reg');
  const isEmailValid = isValidEmail(email);
  const isMatch = (pwd !== '' && pwd === confirmPwd);
  const isQuestionValid = (question !== '');
  const isAnswerValid = (answer !== '');

  document.querySelector('#form-signup button[type="submit"]').disabled = 
    !(isPwdValid && isEmailValid && isMatch && isQuestionValid && isAnswerValid);
}

function validateSetNewPwdForm() {
  const pwd = document.getElementById('new-master-pwd').value;
  const confirmPwd = document.getElementById('confirm-new-pwd').value;
  const isPwdValid = updateChecklist(pwd, 'new');
  
  const isMatch = (pwd !== '' && pwd === confirmPwd);
  document.querySelector('#form-set-new-pwd button[type="submit"]').disabled = !(isPwdValid && isMatch);
}

function showStartupLoading() {
  const startupScreen = document.getElementById('screen-startup');
  if (!startupScreen) {
    showScreen('screen-startup');
    return;
  }

  // Keep the startup experience self-contained so the existing HTML
  // does not need to be changed.
  if (!document.getElementById('checkkey-startup-styles')) {
    const style = document.createElement('style');
    style.id = 'checkkey-startup-styles';
    style.textContent = `
      #screen-startup.checkkey-startup-screen {
        position: fixed !important;
        inset: 0 !important;
        z-index: 20000 !important;
        display: none;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        background:
          radial-gradient(circle at 84% 24%, rgba(252, 220, 199, .58), transparent 30%),
          radial-gradient(circle at 34% 88%, rgba(211, 225, 250, .58), transparent 31%),
          linear-gradient(135deg, #faf9f7 0%, #ffffff 50%, #faf9f7 100%) !important;
        color: #000000 !important;
      }

      #screen-startup.checkkey-startup-screen.active {
        display: flex !important;
      }

      #screen-startup .checkkey-startup-content {
        width: min(520px, calc(100% - 48px));
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transform: translateY(-4px);
      }

      #screen-startup .checkkey-startup-title {
        margin: 0;
        color: #000000 !important;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(32px, 5vw, 52px);
        font-weight: 400;
        line-height: 1.08;
        letter-spacing: -0.035em;
        animation: checkkeyStartupTitleIn .8s cubic-bezier(.22, 1, .36, 1) both;
      }

      #screen-startup .checkkey-startup-progress {
        width: min(260px, 72vw);
        height: 3px;
        margin-top: 28px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(0, 0, 0, .10);
      }

      #screen-startup .checkkey-startup-progress-bar {
        width: 0%;
        height: 100%;
        border-radius: inherit;
        background: #000000;
        transition: width .18s ease-out;
      }

      @keyframes checkkeyStartupTitleIn {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 600px) {
        #screen-startup .checkkey-startup-title {
          font-size: clamp(30px, 9vw, 42px);
        }

        #screen-startup .checkkey-startup-progress {
          margin-top: 24px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  startupScreen.classList.add('checkkey-startup-screen');
  startupScreen.innerHTML = `
    <div class="checkkey-startup-content">
      <h1 class="checkkey-startup-title">Welcome to Check Key</h1>
      <div class="checkkey-startup-progress" role="progressbar"
           aria-label="Loading Check Key"
           aria-valuemin="0"
           aria-valuemax="100"
           aria-valuenow="0">
        <div class="checkkey-startup-progress-bar"></div>
      </div>
    </div>
  `;

  showScreen('screen-startup');

  // Start from 0 and move smoothly toward 90% while Firebase restores
  // the session. The existing auth flow still controls when the screen closes.
  if (window.__checkkeyStartupProgressTimer) {
    window.clearInterval(window.__checkkeyStartupProgressTimer);
  }

  let progress = 0;
  const progressBar = startupScreen.querySelector('.checkkey-startup-progress-bar');
  const progressTrack = startupScreen.querySelector('.checkkey-startup-progress');

  const updateProgress = () => {
    if (!startupScreen.classList.contains('active')) {
      window.clearInterval(window.__checkkeyStartupProgressTimer);
      window.__checkkeyStartupProgressTimer = null;
      return;
    }

    if (progress < 90) {
      progress += progress < 55 ? 2 : 0.7;
      progress = Math.min(progress, 90);
      const rounded = Math.round(progress);

      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressTrack) progressTrack.setAttribute('aria-valuenow', String(rounded));
    }
  };

  window.__checkkeyStartupProgressTimer = window.setInterval(updateProgress, 70);
  updateProgress();
}

function hideStartupLoading(targetScreen) {
  const startupScreen = document.getElementById('screen-startup');
  const progressBar = startupScreen?.querySelector('.checkkey-startup-progress-bar');
  const progressTrack = startupScreen?.querySelector('.checkkey-startup-progress');

  if (progressBar) progressBar.style.width = '100%';
  if (progressTrack) progressTrack.setAttribute('aria-valuenow', '100');

  if (window.__checkkeyStartupProgressTimer) {
    window.clearInterval(window.__checkkeyStartupProgressTimer);
    window.__checkkeyStartupProgressTimer = null;
  }

  if (targetScreen) showScreen(targetScreen);
}

function showScreen(screenId) {
  // Any CHECK KEY screen means the user has entered the app.
  setLandingVisibility(false);

  // Synchronize the persisted language before rendering the target screen.
  // This keeps Landing -> Login/Signup/Vault screens on the exact same EN/VI state.
  const activeLanguage = restoreLanguageState();

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (!targetScreen) {
    console.warn(`[CHECK KEY] Screen not found: ${screenId}`);
    return;
  }

  // Create the recovery header BEFORE activating the screen.
  // This guarantees the header is present during the first render.
  ensureRecoveryPinHeaders();

  targetScreen.classList.add('active');

  // The persisted language is the single source of truth when opening any
  // CHECK KEY panel. Apply it directly to the target screen so Landing ->
  // Login/Signup cannot leave mixed-language static labels behind.
  const panelLanguage = getStoredLanguage();
  currentLanguage = panelLanguage;
  document.documentElement.lang = panelLanguage;

  targetScreen.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = window.t(key);
  });
  targetScreen.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) el.placeholder = window.t(key);
  });
  targetScreen.querySelectorAll('[data-i18n-label]').forEach(el => {
    const key = el.getAttribute('data-i18n-label');
    if (key) el.setAttribute('aria-label', window.t(key));
  });

  if (typeof translateDeviceAccessText === 'function' && activeLanguage) {
    translateDeviceAccessText(activeLanguage);
  }

  const newFolderButton = document.getElementById('folders-page-create');
  if (newFolderButton && typeof window.t === 'function') {
    newFolderButton.textContent = `+ ${window.t('New Folder')}`;
  }

  const activeHeader = targetScreen.querySelector(':scope > header.checkkey-header');
  if (activeHeader) {
    bindRecoveryHeaderActions(activeHeader);
    syncRecoveryHeaderLanguage(activeHeader);
  }

  clearAllErrors();

  // Focus a meaningful element inside the newly shown screen on the next
  // frame. This keeps keyboard/screen-reader focus inside the visible app.
  window.requestAnimationFrame(() => {
    const focusTarget =
      targetScreen.querySelector('h2, h3, input, button, [tabindex]:not([tabindex="-1"])');

    if (focusTarget instanceof HTMLElement) {
      if (!focusTarget.matches('input, button, a, select, textarea')) {
        focusTarget.setAttribute('tabindex', '-1');
      }
      focusTarget.focus({ preventScroll: true });
    }
  });
}

function applyViewOnlyRestrictions() {
  const isInheritor = (currentRole === "inheritor");
  
  const elsToHide = [
    document.getElementById('dashboard-btn-add-credential'),
    document.getElementById('core2-btn-add'),
    document.getElementById('core2-btn-create-folder'),
    document.getElementById('folders-page-create')
  ];
  
  elsToHide.forEach(el => {
    if (el) el.style.display = isInheritor ? 'none' : '';
  });
  
  const detailActions = [
    document.getElementById('core2-btn-archive'),
    document.getElementById('core2-btn-restore'),
    document.getElementById('core2-btn-edit'),
    document.getElementById('core2-btn-delete')
  ];
  
  detailActions.forEach(el => {
    if (el) {
       if (isInheritor) {
           el.classList.add('hidden');
       } else {
           el.classList.remove('hidden'); 
       }
    }
  });
}

function showDashboardView(viewId) {
  const previousViewId = document.querySelector('.dashboard-view.active')?.id || null;

  const getAnalyticsFeature = (id) => {
    if (!id) return null;
    if (id === 'view-dashboard') return 'dashboard';
    if (id.startsWith('view-core2')) return 'my_credentials';
    if (id === 'view-folders' || id === 'view-folder-detail') return 'folders';
    if (id.startsWith('view-core3')) return 'search_history';
    if (id === 'view-emergency-access') return 'vault_inheritance';
    if (id === 'view-devices-access') return 'devices_access';
    if (id === 'view-inherited-vault') return 'inherited_vault';
    if (
      id === 'view-change-pwd' ||
      id === 'view-sec-verification' ||
      id === 'view-set-new-pwd' ||
      id === 'view-pwd-updated'
    ) return 'security_settings';
    return null;
  };

  const previousFeature = getAnalyticsFeature(previousViewId);
  const nextFeature = getAnalyticsFeature(viewId);

  if (previousFeature && previousFeature !== nextFeature) {
    analyticsStopFeature(previousFeature, { role: currentRole });
  }

  document.querySelectorAll('.dashboard-view').forEach(view => view.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');
  clearAllErrors();

  if (nextFeature && previousFeature !== nextFeature) {
    analyticsStartFeature(nextFeature, { role: currentRole });
  }

  document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
  
  if (viewId === 'view-dashboard') document.getElementById('nav-dashboard')?.classList.add('active');
  else if (viewId.startsWith('view-core2')) {
      if (currentRole === 'inheritor') {
          document.getElementById('nav-inheritance')?.classList.add('active');
      } else {
          document.getElementById('nav-credentials')?.classList.add('active');
      }
  }
  else if (viewId === 'view-folders' || viewId === 'view-folder-detail') document.getElementById('nav-folders')?.classList.add('active');
  else if (viewId.startsWith('view-core3')) document.getElementById('nav-search')?.classList.add('active');
  else if (viewId === 'view-emergency-access') document.getElementById('nav-inheritance')?.classList.add('active');
  else if (viewId === 'view-devices-access') document.getElementById('nav-devices')?.classList.add('active');
  else if (viewId === 'view-inherited-vault') document.getElementById('nav-inheritance')?.classList.add('active');
  else if (viewId === 'view-change-pwd' || viewId === 'view-sec-verification' || viewId === 'view-set-new-pwd' || viewId === 'view-pwd-updated') {
    document.getElementById('nav-security')?.classList.add('active');
  }
  else if (viewId === 'view-analytics') {
    document.getElementById('nav-analytics')?.classList.add('active');
  }

  applyViewOnlyRestrictions();

  if (viewId === 'view-core2-list') core2RenderCredentialList();
  if (viewId === 'view-folders') renderFoldersPage();
  if (viewId === 'view-folder-detail') renderFolderDetailPage();
  if (viewId === 'view-core3-search') core3Search();
  if (viewId === 'view-emergency-access') renderInheritanceView();
  if (viewId === 'view-devices-access') renderDeviceList();
  
  if (viewId === 'view-inherited-vault') renderInheritedCredentialList();
  
  core2ResetPasswordVisibility();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function clearAllErrors() {
  document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
}

function showError(inputId, message) {
  const errorElement = document.getElementById(`err-${inputId}`);
  if (errorElement) errorElement.textContent = message;
}

function togglePasswordVisibility(e) {
  const btn = e.target;
  const targetId = btn.getAttribute('data-target');
  const input = document.getElementById(targetId);
  
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = window.t('Hide');
    btn.setAttribute('aria-pressed', 'true');
    
  } else {
    input.type = 'password';
    btn.textContent = window.t('Show');
    btn.setAttribute('aria-pressed', 'false');
  }
}

function refreshAllViews() {
  core3PopulatePlatformFilter();
  core3PopulateCategoryFilter();
  
  appRenderDashboard();
  if (currentRole === 'inheritor') {
      renderInheritedCredentialList();
      
  } else {
      core2RenderCredentialList();
  }
  core3Search();
  renderInheritanceView();
}

function formatHistoryDate(isoString) {
  if (isoString === '—') return isoString;
  
  try {
      const d = new Date(isoString);
      if (isNaN(d.getTime())) return isoString;
      
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      
  } catch(e) { 
      return isoString;
      
  }
}

// ==========================================
// DASHBOARD CHANGE PASSWORD FLOW
// ==========================================

async function handlePasswordChange(e) {
  e.preventDefault();
  clearAllErrors();
  
  const btn = document.querySelector('#form-change-pwd button[type="submit"]');
  
  const pwdInput = document.getElementById('current-master-pwd');
  const pwd = pwdInput.value;

  if (!pwd) {
    showError('current-pwd', window.t('Current password is required.'));
    return;
  }

  btn.disabled = true;
  btn.textContent = window.t('Verifying...');

  try {
    const user = auth.currentUser;
    
    if (!user) throw new Error(window.t("No user logged in."));

    const credential = EmailAuthProvider.credential(user.email, pwd);
    await reauthenticateWithCredential(user, credential);
    
    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (!docSnap.exists()) {
      throw new Error("User data not found in database.");
    }

    const data = docSnap.data();
    
    const array = new Uint8Array(16);
    window.crypto.getRandomValues(array);
    
    const dynamicSaltHex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    
    const hashedCurrentPwd = await verifyHash(pwd, dynamicSaltHex);
    
    tempAuthData = {
      reauthenticated: true,
      timestamp: Date.now(),
      userData: data,
      currentPwdHash: hashedCurrentPwd,
      pwdSalt: dynamicSaltHex
    };
    
    const questionMap = {
      'pet': window.t('What was the name of your first pet?'),
      'school': window.t('What was the name of your first school?')
    };
    
    const displayQ = document.getElementById('display-sec-question');
    if (displayQ) {
      displayQ.textContent = questionMap[data.securityQuestion] || data.securityQuestion;
    }

    pwdInput.value = '';
    showDashboardView('view-sec-verification');

  } catch (error) {
    handleFirebaseError(error, 'current-pwd');
  } finally {
    btn.disabled = false;
    btn.textContent = window.t('Continue');
  }
}

async function verifySecurityAnswer(e) {
  e.preventDefault();
  clearAllErrors();
  
  const btn = document.querySelector('#form-sec-verification button[type="submit"]');
  const answerInput = document.getElementById('verify-sec-answer');
  const answer = answerInput.value.trim().toLowerCase();
  
  if (!answer) {
    showError('verify-answer', window.t('Answer is required.'));
    return;
  }

  if (!tempAuthData.reauthenticated || !tempAuthData.userData) {
    showError('verify-answer', window.t('Please verify your current password first.'));
    
    setTimeout(() => showDashboardView('view-change-pwd'), 2000);
    return;
  }

  btn.disabled = true;
  btn.textContent = window.t('Verifying...');
  
  try {
    const hashHex = await verifyHash(answer, tempAuthData.userData.securityAnswerSalt);
    
    if (hashHex === tempAuthData.userData.securityAnswerHash) {
      answerInput.value = '';
      showDashboardView('view-set-new-pwd');
      
    } else {
      showError('verify-answer', window.t('Incorrect security answer.'));
      
    }
  } catch (error) {
    showError('verify-answer', window.t('An error occurred during verification.'));
    
  } finally {
    btn.disabled = false;
    btn.textContent = window.t('Verify');
  }
}

async function updateNewPassword(e) {
  e.preventDefault();
  clearAllErrors();
  
  const btn = document.querySelector('#form-set-new-pwd button[type="submit"]');
  const newPwdInput = document.getElementById('new-master-pwd');
  const confirmPwdInput = document.getElementById('confirm-new-pwd');
  const newPwd = newPwdInput.value;
  
  if (!tempAuthData.reauthenticated || !tempAuthData.pwdSalt) {
    showError('new-master-pwd', window.t('Authentication expired. Please start over.'));
    setTimeout(() => showDashboardView('view-change-pwd'), 2000);
    return;
  }

  if (!activeVaultKey || activeVaultUid !== auth.currentUser.uid) {
    showError('new-master-pwd', window.t('Vault is locked. Cannot change password.'));
    return;
  }

  btn.disabled = true;
  btn.textContent = window.t('Updating...');

  try {
    const hashedNewPwd = await verifyHash(newPwd, tempAuthData.pwdSalt);
    
    if (hashedNewPwd === tempAuthData.currentPwdHash) {
        showError('new-master-pwd', window.t('New master password must be different from your current password.'));
        
        newPwdInput.focus();
        btn.disabled = false;
        btn.textContent = window.t('Update password');
        return;
    }

    const vaultRef = doc(db, "users", auth.currentUser.uid, "vault", "config");
    
    const pendingData = await rewrapVaultKeyWithNewPassword(newPwd);
    await updateDoc(vaultRef, pendingData);

    let authUpdated = false;
    
    try {
        await updatePassword(auth.currentUser, newPwd);
        authUpdated = true;
        
    } catch (authError) {
        await updateDoc(vaultRef, {
            pendingWrappedVaultKey: deleteField(),
            pendingWrapIv: deleteField(),
            pendingKdfSalt: deleteField(),
            pendingKdfIterations: deleteField(),
            pendingVersion: deleteField(),
            pendingCreatedAt: deleteField()
        });
        
        throw authError;
    }

    if (authUpdated) {
        try {
            await updateDoc(vaultRef, {
              wrappedVaultKey: pendingData.pendingWrappedVaultKey,
              wrapIv: pendingData.pendingWrapIv,
              kdfSalt: pendingData.pendingKdfSalt,
              kdfIterations: pendingData.pendingKdfIterations,
              encryptionVersion: pendingData.pendingVersion,
              updatedAt: serverTimestamp(),
              pendingWrappedVaultKey: deleteField(),
              pendingWrapIv: deleteField(),
              pendingKdfSalt: deleteField(),
              pendingKdfIterations: deleteField(),
              pendingVersion: deleteField(),
              pendingCreatedAt: deleteField()
            });
            
        } catch (promoteError) {
            sessionExpiredByInactivity = false;
            stopInactivityTracking();
            lockVault();
            
            await signOut(auth);
            showError('new-master-pwd', window.t('Password updated, but sync was interrupted. Please log in again.'));
            setTimeout(() => showScreen('screen-login'), 3000);
            return;
            
        }
    }

    sessionExpiredByInactivity = false;
    clearDashboardSessionMarker();
    hideAnalyticsDashboardAccess();
    stopInactivityTracking();
    lockVault();

    isRecoveryFlow = true;
    await handleLogout();

    tempAuthData = { reauthenticated: false, timestamp: null, userData: null, currentPwdHash: null, pwdSalt: null };
    newPwdInput.value = '';
    confirmPwdInput.value = '';

    document.getElementById('current-master-pwd').value = '';
    document.getElementById('verify-sec-answer').value = '';
    updateChecklist('', 'new');

    showScreen('screen-login');
    appShowToast(window.t('Your master password has been changed.'));
    isRecoveryFlow = false;

  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
        tempAuthData = { reauthenticated: false, timestamp: null, userData: null, currentPwdHash: null, pwdSalt: null };
        
        showDashboardView('view-change-pwd');
        showError('current-pwd', window.t('Session expired. Please enter your current password again.'));
        
    } else {
        handleFirebaseError(error, 'new-master-pwd');
        
    }
  } finally {
    if (btn) {
        btn.disabled = false;
        
        btn.textContent = window.t('Update password');
    }
  }
}

// ==========================================
// CORE 2+3 UTILITIES & RENDER LOGIC
// ==========================================

// FIX: INHERITANCE STATE RESET
function resetCore23State() {
  stopCredentialsSubscription();
  
  core2Credentials = [];
  inheritedCredentials = []; // explicitly cleared
  core2CurrentId = null;
  core2PendingAction = null;
  core2LastSavedId = null;
  core3CurrentHistoryId = null;
  
  core3CurrentCredentialId = null;
  
  core2PendingSaveCallback = null;

  const core2Form = document.getElementById('core2-credential-form');
  if (core2Form) {
    core2Form.reset();
    
    const inputId = document.getElementById('core2-input-id');
    if (inputId) inputId.value = '';
    core2ToggleCustomCategory();
    core2ClearFormErrors();
  }

  const searchForm = document.getElementById('core3-search-form');
  
  if (searchForm) {
    searchForm.reset();
  }
  
  if(document.getElementById('core2-select-status')) document.getElementById('core2-select-status').value = 'active';
  
  if(document.getElementById('core3-select-status')) document.getElementById('core3-select-status').value = 'active';
  if(document.getElementById('core2-select-sort')) document.getElementById('core2-select-sort').value = 'updated-desc';
  if(document.getElementById('core3-select-sort')) document.getElementById('core3-select-sort').value = 'updated-desc';

  document.getElementById('modal-core2-confirm')?.classList.add('hidden');
  document.getElementById('modal-core2-success')?.classList.add('hidden');
  document.getElementById('modal-core2-create-folder')?.classList.add('hidden');
  document.getElementById('modal-delete-account')?.classList.add('hidden');
  document.getElementById('modal-duplicate-warning')?.classList.add('hidden');
  document.getElementById('modal-add-inheritor')?.classList.add('hidden');
  document.getElementById('app-toast')?.classList.add('hidden');
  
  if (appToastTimer) clearTimeout(appToastTimer);

  const recentList = document.getElementById('dashboard-recent-list');
  if (recentList) recentList.innerHTML = '';

  const credBody = document.getElementById('core2-credentials-body');
  
  if (credBody) credBody.innerHTML = '';

  const searchResults = document.getElementById('core3-results-list');
  if (searchResults) searchResults.innerHTML = '';

  const historyList = document.getElementById('core3-history-list');
  
  if (historyList) historyList.innerHTML = '';

  const elsToClear = [
    'core2-detail-username', 'core2-detail-category', 'core2-detail-notes', 'core2-detail-updated',
    'core3-selected-username', 'core3-selected-updated', 'core3-current-date', 'core2-detail-website-container', 'core3-detail-website-container'
  ];
  
  elsToClear.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  });
  
  const passesToClear = ['core2-detail-password', 'core3-selected-password', 'core3-current-password'];
  passesToClear.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = '••••••••••';
        el.dataset.visible = 'false';
    }
  });
  
  core2ResetPasswordVisibility();
}

function appShowToast(message) {
  document.getElementById('app-toast-message').textContent = message; 
  document.getElementById('app-toast').classList.remove('hidden');
  clearTimeout(appToastTimer); 
  appToastTimer = setTimeout(() => document.getElementById('app-toast').classList.add('hidden'), 2200);
}
function appMask(value) { return '•'.repeat(Math.max(10, Math.min(16, value.length))); }
function appEscape(value = '') { 
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}

function appRenderDashboard() {
  const recent = [...core2Credentials].filter(c => !c.archived).reverse().slice(0, 4);
  const container = document.getElementById('dashboard-recent-list');
  if(!container) return;
  
  if (recent.length === 0) {
    container.innerHTML = `<p class="text-center text-muted mt-3">${window.t('No active credentials yet.')}</p>`;
    return;
    
  }
  
  container.innerHTML = recent.map(c => `
    <div class="recent-item">
      <div class="flex-start align-center">
        <div>
          <strong>${appEscape(c.platform)}</strong>
          <small class="text-muted" style="display:block; margin-top: 4px;">${appEscape(c.username)} · ${c.updated}</small>
        </div>
      </div>
      <button class="btn-primary btn-auto" style="min-height: 32px; padding: 6px 12px; font-size: 13px;" data-dashboard-open="${c.id}">${window.t('View')}</button>
    </div>
  `).join('');
  
  document.querySelectorAll('[data-dashboard-open]').forEach(b => {
    b.addEventListener('click', () => core2ViewCredential(b.dataset.dashboardOpen));
  });
  
}

function core2RenderCredentialList() {
  const statusFilter = document.getElementById('core2-select-status')?.value || 'active';
  const folderFilter = document.getElementById('core2-select-folder-filter')?.value || 'all';
  
  const sortFilter = document.getElementById('core2-select-sort')?.value || 'updated-desc';
  
  let filtered = core2Credentials.filter(c => {
    const isArchived = c.archived === true;
    if (statusFilter === 'active' && isArchived) return false;
    if (statusFilter === 'archived' && !isArchived) return false;

    if (folderFilter !== 'all') {
      const cFolder = (typeof c.folderId === 'string' && c.folderId.trim()) ? c.folderId : "";
      if (cFolder !== folderFilter) return false;
    }
    return true; 
  });
  
  filtered = appSortCredentials(filtered, sortFilter);

  const countStr = filtered.length === 1 ? window.t('1 credential') : window.t('{{count}} credentials', { count: filtered.length });
  document.getElementById('core2-credential-count').textContent = countStr;
  
  const tbody = document.getElementById('core2-credentials-body');
  
  tbody.innerHTML = filtered.map(c => `
    <tr>
      <td>${appEscape(c.platform)}</td>
      <td>${appEscape(c.username)}</td>
      <td>${appEscape(translateCategory(c.category))}</td>
      <td class="text-right">
        <button class="btn-primary btn-auto" style="min-height: 32px; padding: 6px 12px; font-size: 13px;" data-core2-view="${c.id}">${window.t('View')}</button>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('core2-empty-state').classList.toggle('hidden', filtered.length !== 0); 
  tbody.closest('.table-wrap').classList.toggle('hidden', filtered.length === 0);
  
  document.querySelectorAll('[data-core2-view]').forEach(b => {
    b.addEventListener('click', () => core2ViewCredential(b.dataset.core2View));
  });
  
}

function core2OpenAddForm() {
  if (currentRole === "inheritor") {
     appShowToast(window.t("VIEW ONLY access. Cannot add credentials."));
     return;
     
  }
  core2CurrentId = null; 
  document.getElementById('core2-form-heading').textContent = window.t('Add Credential'); 
  document.getElementById('core2-btn-save').textContent = window.t('Save credential'); 
  document.getElementById('core2-credential-form').reset(); 
  document.getElementById('core2-input-id').value = ''; 
  const inheritableCheckbox = document.getElementById('core2-input-inheritable');
  if (inheritableCheckbox) inheritableCheckbox.checked = true; // Default ON for new credentials
  core2ToggleCustomCategory(); 
  core2ClearFormErrors(); 
  populateFolderSelect(core2CurrentFolderId || "");
  
  showDashboardView('view-core2-form');
}

function core2ToggleCustomCategory() {
  const isOther = document.getElementById('core2-input-category').value === 'Other';
  document.getElementById('core2-custom-category-wrapper').classList.toggle('hidden', !isOther);
  
  if(!isOther) {
    document.getElementById('core2-input-custom-category').value = '';
    document.getElementById('core2-error-custom-category').textContent = '';
  }
}

function core2GetCategoryData() {
  const selectEl = document.getElementById('core2-input-category');
  const optionEl = selectEl.options[selectEl.selectedIndex];
  // Ưu tiên đọc key tiếng Anh từ data-i18n thay vì text đã bị dịch sang tiếng Việt
  const selected = optionEl.getAttribute('data-i18n') || selectEl.value;
  
  if(selected === 'Other') return { category: document.getElementById('core2-input-custom-category').value.trim(), categoryGroup: 'Other' };
  return { category: selected, categoryGroup: selected };
  
}

function core2ValidateCredential() {
  core2ClearFormErrors(); 
  let valid = true;
  const fields = [
    ['platform', window.t('Platform name is required.')],
    ['username', window.t('Username or email is required.')],
    ['password', window.t('Use a fictional prototype password.')]
  ];
  
  fields.forEach(([name, msg]) => {
    const el = document.getElementById(`core2-input-${name}`);
    if(!el.value.trim()) { document.getElementById(`core2-error-${name}`).textContent = msg; valid = false; }
  });
  
  if(document.getElementById('core2-input-category').value === 'Other' && !document.getElementById('core2-input-custom-category').value.trim()){
    document.getElementById('core2-error-custom-category').textContent = window.t('Enter a name for this category.');
    valid = false;
    
  }
  return valid;
}

async function core2AddCredential(formData) {
  try {
    await createCredential(formData);
    analyticsTrack("credential_created", { role: currentRole });
    
    core2ShowSuccess(window.t('Your credential has been saved.'));
  } catch (err) {
    analyticsTrack("credential_create_failed", {
      role: currentRole,
      errorCode: err?.code || err?.name || "unknown_error"
    });
    appShowToast(err.message || window.t('Failed to save credential.'));
    
  }
}

function core2OpenEdit(id) {
  if (currentRole === "inheritor") {
     appShowToast(window.t("VIEW ONLY access. Cannot edit credentials."));
     return;
     
  }
  const c = getActiveCredentials().find(item => item.id === id); if(!c) return;
  core2CurrentId = id; 
  document.getElementById('core2-form-heading').textContent = window.t('Edit Credential');
  
  document.getElementById('core2-btn-save').textContent = window.t('Save changes'); 
  document.getElementById('core2-input-id').value = id; 
  document.getElementById('core2-input-platform').value = c.platform; 
  document.getElementById('core2-input-website').value = c.website || '';
  document.getElementById('core2-input-username').value = c.username;
  
  document.getElementById('core2-input-password').value = c.password; 
  
  const categoryGroup = c.categoryGroup || (['Education','Social','Work','Finance'].includes(c.category) ? c.category : 'Other'); 
  document.getElementById('core2-input-category').value = categoryGroup; 
  core2ToggleCustomCategory();
  
  document.getElementById('core2-input-custom-category').value = categoryGroup === 'Other' ? c.category : ''; 
  document.getElementById('core2-input-notes').value = c.notes; 
  
  const inheritableCheckbox = document.getElementById('core2-input-inheritable');
  if (inheritableCheckbox) {
      inheritableCheckbox.checked = c.inheritEnabled === true; // Reflect current state
  }
  
  populateFolderSelect(c.folderId);
  core2ClearFormErrors(); 
  showDashboardView('view-core2-form');
  
}

async function core2SaveEdit(id, formData) {
  try {
    await updateCredential(id, formData);
    analyticsTrack("credential_updated", { role: currentRole });
    core2ShowSuccess(window.t('Your changes have been saved.'));
    
  } catch (err) {
    analyticsTrack("credential_update_failed", {
      role: currentRole,
      errorCode: err?.code || err?.name || "unknown_error"
    });
    appShowToast(err.message || window.t('Failed to update credential.'));
    
  }
}

function updateCore2DetailBackLabel() {
  const back = document.getElementById('core2-btn-back-from-detail');
  if (!back) return;

  if (core2CurrentFolderId) {
    back.textContent = window.t('← Back to Folder');
    back.setAttribute('data-i18n', '← Back to Folder');
  } else {
    back.textContent = window.t('← Back to My Credentials');
    back.setAttribute('data-i18n', '← Back to My Credentials');
  }
}

function core2ViewCredential(id) {
  const c = getActiveCredentials().find(item => item.id === id); if(!c) return;
  core2CurrentId = id; 
  analyticsTrack("credential_viewed", { role: currentRole, source: "credentials" });
  document.getElementById('core2-detail-platform').textContent = c.platform;
  
  renderWebsiteLink('core2-detail-website-container', c.website, c.platform);

  document.getElementById('core2-detail-username').textContent = c.username; 
  document.getElementById('core2-detail-password').textContent = appMask(c.password); 
  document.getElementById('core2-detail-password').dataset.visible = 'false'; 
  
  const btn = document.getElementById('core2-btn-show');
  btn.textContent = window.t('Show');
  
  btn.setAttribute('aria-pressed', 'false');

  document.getElementById('core2-detail-category').textContent = translateCategory(c.category); 
  document.getElementById('core2-detail-notes').textContent = c.notes || window.t('No notes added.'); 
  
  document.getElementById('core2-detail-updated').textContent = appFormatTimestamp(c.rawUpdatedAt);
  
  updateCore2DetailBackLabel();

  if (currentRole !== 'inheritor') {
      if (c.archived) {
          document.getElementById('core2-btn-archive').classList.add('hidden');
          
          document.getElementById('core2-btn-restore').classList.remove('hidden');
      } else {
          document.getElementById('core2-btn-archive').classList.remove('hidden');
          document.getElementById('core2-btn-restore').classList.add('hidden');
      }
  }

  showDashboardView('view-core2-detail');
  
}

function core2TogglePassword() {
  const c = getActiveCredentials().find(item => item.id === core2CurrentId); if(!c) return;
  const output = document.getElementById('core2-detail-password');
  
  const btn = document.getElementById('core2-btn-show');
  
  const visible = output.dataset.visible === 'true'; 
  output.textContent = visible ? appMask(c.password) : c.password; 
  analyticsTrack(visible ? "credential_password_hidden" : "credential_password_revealed", {
    role: currentRole,
    source: "credentials"
  });
  output.dataset.visible = String(!visible);
  
  btn.textContent = visible ? window.t('Show') : window.t('Hide');
  btn.setAttribute('aria-pressed', String(!visible));
}

async function core2CopyPassword() {
  const c = getActiveCredentials().find(item => item.id === core2CurrentId);
  
  if(!c) return;
  try {
    await navigator.clipboard.writeText(c.password);
    analyticsTrack("credential_password_copied", { role: currentRole, source: "credentials" });
    appShowToast(window.t('Password copied.'));
    
  } catch {
    appShowToast(window.t('Copy is unavailable in this browser.'));
    
  }
}

async function core2RequestArchive() {
  if (currentRole === "inheritor") return;
  const btn = document.getElementById('core2-btn-archive');
  btn.disabled = true;
  
  try {
    await archiveCredential(core2CurrentId);
    analyticsTrack("credential_archived", { role: currentRole });
    appShowToast(window.t('Credential archived.'));
  } catch (err) {
    analyticsTrack("credential_archive_failed", {
      role: currentRole,
      errorCode: err?.code || err?.name || "unknown_error"
    });
    appShowToast(err.message || window.t('Failed to archive.'));
    
  } finally {
    if (btn) btn.disabled = false;
    
  }
}

async function core2RequestRestore() {
  if (currentRole === "inheritor") return;
  const btn = document.getElementById('core2-btn-restore');
  btn.disabled = true;
  
  try {
    await restoreCredential(core2CurrentId);
    analyticsTrack("credential_restored", { role: currentRole });
    appShowToast(window.t('Credential restored.'));
  } catch (err) {
    analyticsTrack("credential_restore_failed", {
      role: currentRole,
      errorCode: err?.code || err?.name || "unknown_error"
    });
    appShowToast(err.message || window.t('Failed to restore.'));
    
  } finally {
    if (btn) btn.disabled = false;
  }
}

function core2RequestDelete() {
  if (currentRole === "inheritor") return;
  
  core2PendingAction = { type: 'delete', id: core2CurrentId }; 
  document.getElementById('core2-confirm-title').textContent = window.t('Delete credential?');
  
  document.getElementById('core2-confirm-message').textContent = window.t('This action cannot be undone and will be permanently removed from your vault.'); 
  document.getElementById('core2-btn-confirm-action').textContent = window.t('Delete'); 
  document.getElementById('modal-core2-confirm').classList.remove('hidden');
  
}

async function core2ConfirmAction() {
  if(!core2PendingAction) return;
  const btn = document.getElementById('core2-btn-confirm-action');
  btn.disabled = true;
  btn.textContent = window.t('Processing...');
  
  try {
    if(core2PendingAction.type === 'delete') {
      await deleteCredential(core2PendingAction.id);
    analyticsTrack("credential_deleted", { role: currentRole });
      appShowToast(window.t('Credential deleted.'));
      showDashboardView('view-core2-list');
      
    }
    core2CloseConfirm();
  } catch (err) {
    analyticsTrack("credential_delete_failed", {
      role: currentRole,
      errorCode: err?.code || err?.name || "unknown_error"
    });
    appShowToast(err.message || window.t('Failed to delete credential.'));
    
  } finally {
    btn.disabled = false;
    btn.textContent = window.t('Confirm');
  }
}

function core2CloseConfirm() {
  document.getElementById('modal-core2-confirm').classList.add('hidden');
  core2PendingAction = null;
  
}

function core2ShowSuccess(message) {
  document.getElementById('core2-success-message').textContent = message;
  document.getElementById('modal-core2-success').classList.remove('hidden');
}

function core2CloseSuccess() {
  document.getElementById('modal-core2-success').classList.add('hidden');
  
}

function core2ClearFormErrors() {
  ['platform', 'username', 'password', 'custom-category'].forEach(name => {
    const el = document.getElementById(`core2-error-${name}`);
    if(el) el.textContent = '';
  });
  
}

function core2ResetPasswordVisibility() {
  if (document.getElementById('core2-detail-password')) {
    document.getElementById('core2-detail-password').dataset.visible = 'false';
    const btn = document.getElementById('core2-btn-show');
    
    if(btn) {
        btn.textContent = window.t('Show');
        btn.setAttribute('aria-pressed', 'false');
        
    }
  }
  if (document.getElementById('core3-selected-password')) {
    document.getElementById('core3-selected-password').dataset.visible = 'false';
    const btn = document.getElementById('core3-btn-show-selected');
    
    if(btn) {
        btn.textContent = window.t('Show');
        btn.setAttribute('aria-pressed', 'false');
        
    }
  }
  if (document.getElementById('core3-current-password')) {
    document.getElementById('core3-current-password').dataset.visible = 'false';
    const btn = document.getElementById('core3-btn-show-current');
    
    if(btn) {
        btn.textContent = window.t('Show');
        btn.setAttribute('aria-pressed', 'false');
        
    }
  }
  if (document.getElementById('core2-input-password')) {
    document.getElementById('core2-input-password').type = 'password';
    
  }
  if (document.getElementById('core2-btn-toggle-form-password')) {
    const btn = document.getElementById('core2-btn-toggle-form-password');
    btn.textContent = window.t('Show');
    btn.setAttribute('aria-pressed', 'false');
    
  }
}

function core3PopulatePlatformFilter() {
  const select = document.getElementById('core3-select-platform');
  const current = select.value;
  const platforms = [...new Set(core2Credentials.map(c => c.platform))].sort();
  
  select.innerHTML = `<option value="all">${window.t('Platform')}</option>` + platforms.map(p => `<option value="${appEscape(p)}">${appEscape(p)}</option>`).join('');
  if (platforms.includes(current)) select.value = current;
  else select.value = 'all';
  
}

function core3PopulateCategoryFilter() {
  const select = document.getElementById('core3-select-category');
  const current = select.value;
  
  const categories = [...new Set(core2Credentials.map(c => c.categoryGroup || c.category))].sort();
  select.innerHTML = `<option value="all">${window.t('Category')}</option>` + categories.map(p => `<option value="${appEscape(p)}">${appEscape(p)}</option>`).join('');
  
  if (categories.includes(current)) select.value = current;
  else select.value = 'all';
}

function core3Search() {
  const query = document.getElementById('core3-input-search').value.trim().toLowerCase();
  
  const platform = document.getElementById('core3-select-platform').value;
  const category = document.getElementById('core3-select-category').value;
  const status = document.getElementById('core3-select-status')?.value || 'active';
  const sortFilter = document.getElementById('core3-select-sort')?.value || 'updated-desc';
  
  let results = core2Credentials
    .filter(c => {
        const isArchived = c.archived === true;
        if (status === 'active') return !isArchived;
        if (status === 'archived') return isArchived;
        return true; 
    })
    .filter(c => platform === 'all' || c.platform === platform)
    .filter(c => category === 'all' || (c.categoryGroup || c.category) === category)
    .filter(c => {
      
        if (!query) return true;
        const textToSearch = [c.platform, c.username, c.website, c.category, c.notes].filter(Boolean).join(' ').toLowerCase();
        return textToSearch.includes(query);
    });
    
  results = appSortCredentials(results, sortFilter);

  analyticsTrack("search_performed", {
    source: "search_history",
    hasQuery: query.length > 0,
    hasPlatformFilter: platform !== "all",
    hasCategoryFilter: category !== "all",
    statusFilter: status,
    sort: sortFilter,
    resultCount: results.length
  });
    
  core3RenderSearchResults(results, query);
}

function core3RenderSearchResults(results, query = '') {
  document.getElementById('core3-results-heading').textContent = query ? window.t('Search results for “{{query}}”', {query}) : window.t('All credentials');
  const countStr = results.length === 1 ? window.t('1 result found') : window.t('{{count}} results found', {count: results.length});
  document.getElementById('core3-results-count').textContent = countStr;
  
  const tbody = document.getElementById('core3-results-list');
  tbody.innerHTML = results.map(c => `
    <tr>
      <td>${appEscape(c.platform)}</td>
      <td>${appEscape(c.username)}</td>
      <td>${appEscape(translateCategory(c.category))}</td>
      <td class="text-right">
        <button class="btn-primary btn-auto" style="min-height: 32px; padding: 6px 12px; font-size: 13px;" data-core3-view="${c.id}">${window.t('View')}</button>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('core3-empty-state').classList.toggle('hidden', results.length !== 0);
  document.getElementById('core3-results-table-wrap').classList.toggle('hidden', results.length === 0);
  
  document.querySelectorAll('[data-core3-view]').forEach(b => {
    b.addEventListener('click', () => core3ViewSelectedCredential(b.dataset.core3View));
  });
  
}

function core3ClearSearch() {
  document.getElementById('core3-search-form').reset();
  core3PopulatePlatformFilter();
  core3PopulateCategoryFilter();
  core3Search();
}

function core3ViewSelectedCredential(id) {
  const c = core2Credentials.find(item => item.id === id);
  
  if(!c) return;
  core3CurrentCredentialId = id;
  analyticsTrack("credential_viewed", { role: currentRole, source: "search_history" });
  
  document.getElementById('core3-selected-platform').textContent = c.platform;
  document.getElementById('core3-selected-platform-value').textContent = c.platform;
  
  renderWebsiteLink('core3-detail-website-container', c.website, c.platform);

  document.getElementById('core3-selected-username').textContent = c.username;
  document.getElementById('core3-selected-password').textContent = appMask(c.password);
  
  document.getElementById('core3-selected-password').dataset.visible = 'false';
  
  const btn = document.getElementById('core3-btn-show-selected');
  btn.textContent = window.t('Show');
  btn.setAttribute('aria-pressed', 'false');

  document.getElementById('core3-selected-updated').textContent = appFormatTimestamp(c.rawUpdatedAt);
  
  showDashboardView('view-core3-detail');
  
}

function core3ToggleSelectedPassword() {
  const c = core2Credentials.find(item => item.id === core3CurrentCredentialId); if(!c) return;
  const el = document.getElementById('core3-selected-password');
  
  const btn = document.getElementById('core3-btn-show-selected');
  
  const visible = el.dataset.visible === 'true';
  el.textContent = visible ? appMask(c.password) : c.password;
  el.dataset.visible = String(!visible);
  
  btn.textContent = visible ? window.t('Hide') : window.t('Show');
  btn.setAttribute('aria-pressed', String(!visible));
}

async function core3CopySelectedPassword() {
  const c = core2Credentials.find(item => item.id === core3CurrentCredentialId);
  if(!c) return;
  try {
    await navigator.clipboard.writeText(c.password);
    appShowToast(window.t('Password copied.'));
  } catch {
    appShowToast(window.t('Copy is unavailable in this browser.'));
  }
}

function core3OpenHistory(id = core3CurrentCredentialId) {
  const c = core2Credentials.find(item => item.id === id);
  
  if(!c) return;
  core3CurrentHistoryId = id;
  
  document.getElementById('core3-history-platform').textContent = c.platform;
  document.getElementById('core3-current-password').textContent = appMask(c.password);
  document.getElementById('core3-current-password').dataset.visible = 'false';
  
  const btn = document.getElementById('core3-btn-show-current');
  
  btn.textContent = window.t('Show');
  btn.setAttribute('aria-pressed', 'false');

  document.getElementById('core3-current-date').textContent = c.updated;
  
  const historyList = document.getElementById('core3-history-list');
  const histArr = c.history && c.history.length ?
  
  c.history : [{ password: window.t('No previous prototype password'), date: '—' }];
  
  historyList.innerHTML = histArr.map((h, index) => `
    <div class="history-item flex-between align-center border-bottom pb-2 pt-2">
      <div>
        <strong class="password-output" id="core3-history-password-${index}" data-visible="false">
          ${h.date === '—' ? appEscape(h.password) : appMask(h.password)}
        </strong>
      </div>
      <span class="text-muted" style="font-size: 13px;">${formatHistoryDate(h.date)}</span>
      ${h.date === '—' ? '' : `<button type="button" class="btn-secondary btn-auto" aria-pressed="false" style="min-height: 32px; padding: 6px 12px; font-size: 13px;" data-core3-toggle-history="${index}">${window.t('Show')}</button>`}
    </div>
 
  `).join('');
  
  document.querySelectorAll('[data-core3-toggle-history]').forEach(b => {
    b.addEventListener('click', () => core3ToggleHistoryPassword(Number(b.dataset.core3ToggleHistory), b));
  });
  
  showDashboardView('view-core3-history');
  
}

function core3ToggleCurrentPassword() {
  const c = core2Credentials.find(item => item.id === core3CurrentHistoryId); if(!c) return;
  const el = document.getElementById('core3-current-password');
  
  const btn = document.getElementById('core3-btn-show-current');
  
  const visible = el.dataset.visible === 'true';
  el.textContent = visible ? appMask(c.password) : c.password;
  el.dataset.visible = String(!visible);
  
  btn.textContent = visible ? window.t('Hide') : window.t('Show');
  btn.setAttribute('aria-pressed', String(!visible));
}

function core3ToggleHistoryPassword(index, button) {
  const c = core2Credentials.find(item => item.id === core3CurrentHistoryId);
  
  if (!c || !c.history || !c.history[index]) return;
  const actualPassword = c.history[index].password;

  const el = document.getElementById(`core3-history-password-${index}`);
  
  const visible = el.dataset.visible === 'true';
  el.textContent = visible ? appMask(actualPassword) : actualPassword;
  el.dataset.visible = String(!visible);
  button.textContent = visible ? window.t('Hide') : window.t('Show');
  button.setAttribute('aria-pressed', String(!visible));
}


