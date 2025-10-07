import Icon from '@/components/ui/icon';

const QuickContactButtons = () => {
  const phoneNumber = '79805557580';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Здравствуйте!%20Хочу%20получить%20консультацию%20по%20недвижимости`;
  const telegramUrl = `https://t.me/${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={28} className="text-white" />
      </a>
      
      <a
        href={telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0088cc] hover:bg-[#0077b5] rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Написать в Telegram"
      >
        <Icon name="Send" size={26} className="text-white" />
      </a>
      
      <a
        href={`tel:+${phoneNumber}`}
        className="w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
        aria-label="Позвонить"
      >
        <Icon name="Phone" size={26} className="text-white" />
      </a>
    </div>
  );
};

export default QuickContactButtons;
