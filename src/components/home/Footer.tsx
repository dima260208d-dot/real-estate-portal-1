export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="https://cdn.poehali.dev/files/49921f72-fe81-4d6d-975f-1ba898046b57.jpg" alt="ЮР Недвижимость" className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-bold text-lg">ЮР Недвижимость</h3>
              </div>
            </div>
            <p className="text-gray-400 text-sm">Полный комплекс услуг на рынке недвижимости Воронежа</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
            <div className="space-y-2 text-sm">
              <a href="#services" className="block text-gray-400 hover:text-[#FF6600] transition-colors">Услуги</a>
              <a href="#faq" className="block text-gray-400 hover:text-[#FF6600] transition-colors">FAQ</a>
              <a href="#contacts" className="block text-gray-400 hover:text-[#FF6600] transition-colors">Контакты</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>+7 980 555 75 80</p>
              <p>yur.nedv@mail.com</p>
              <div className="flex gap-3 mt-4">
                <a href="https://vk.com/yur.nedv" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6600] transition-colors">VK</a>
                <a href="https://t.me/yur_nedv" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6600] transition-colors">Telegram</a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© ЮР Недвижимость, 2024. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}