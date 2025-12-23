import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const images = [
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H.jpg", alt: "Паллетообмотчик TS-3000SPS-H - общий вид" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-2.jpg", alt: "Паллетообмотчик - вид сбоку" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-3.jpg", alt: "Паллетообмотчик - вид спереди" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-4.jpg", alt: "Упакованный паллет на платформе" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-5.jpg", alt: "Панель управления машиной" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-6.jpg", alt: "Кнопка безопасности" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-7.jpg", alt: "Система подачи пленки" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-8.jpg", alt: "Ролики для пленки" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-9.jpg", alt: "Паллет на платформе крупным планом" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-10.jpg", alt: "Процесс обмотки паллета" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-11.jpg", alt: "Детали платформы" },
  { url: "https://cdn.poehali.dev/files/TS-3000SPS-H-12.jpg", alt: "Шильдик оборудования" },
];

const specs = [
  { label: "Модель", value: "TS3000SPS-H" },
  { label: "Напряжение питания", value: "220V" },
  { label: "Мощность", value: "1.5 кВт" },
  { label: "Вес оборудования", value: "500 кг" },
  { label: "Дата производства", value: "2025.10" },
  { label: "Заводской номер", value: "20251025151" },
];

const features = [
  {
    icon: "Settings",
    title: "Автоматическая работа",
    description: "Полностью автоматизированный процесс обмотки паллет с программным управлением"
  },
  {
    icon: "Zap",
    title: "Высокая производительность",
    description: "Быстрая упаковка до 30 паллет в час с минимальным участием оператора"
  },
  {
    icon: "Shield",
    title: "Безопасность",
    description: "Аварийная кнопка остановки и защитные системы для безопасной работы"
  },
  {
    icon: "DollarSign",
    title: "Экономия материалов",
    description: "Оптимальное использование стретч-пленки снижает затраты на упаковку"
  }
];

export default function Index() {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="bg-white border-b sticky top-0 z-50 backdrop-blur-sm bg-white/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Package" size={32} className="text-primary" />
            <span className="text-2xl font-bold text-foreground">SMOOTHXEL</span>
          </div>
          <Button className="hidden md:inline-flex">
            Получить консультацию
          </Button>
        </div>
      </nav>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Паллетообмотчик <span className="text-primary">TS-3000SPS-H</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Профессиональное оборудование для автоматической упаковки паллет в стретч-пленку. 
              Надежность, производительность и безопасность для вашего склада.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                Заказать звонок
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="FileText" size={20} className="mr-2" />
                Скачать каталог
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden shadow-xl">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-slate-100">
                <img
                  src={images[currentImage].url}
                  alt={images[currentImage].alt}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImage 
                          ? "bg-primary w-8" 
                          : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Показать изображение ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Преимущества оборудования
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name={feature.icon as any} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="specs" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="gallery">Галерея</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Icon name="FileText" size={24} className="text-primary" />
                  Технические характеристики
                </h3>
                <div className="space-y-4">
                  {specs.map((spec, idx) => (
                    <div 
                      key={idx} 
                      className="flex justify-between items-center py-3 border-b last:border-0"
                    >
                      <span className="text-muted-foreground font-medium">{spec.label}</span>
                      <span className="font-semibold text-lg">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gallery" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className="relative aspect-square rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all group"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Готовы повысить эффективность вашего склада?
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Свяжитесь с нами для получения коммерческого предложения и консультации по выбору оборудования
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Icon name="Mail" size={20} className="mr-2" />
              Отправить запрос
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Написать в WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Package" size={28} className="text-primary" />
                <span className="text-xl font-bold text-white">SMOOTHXEL</span>
              </div>
              <p className="text-sm">
                Профессиональное упаковочное оборудование для вашего бизнеса
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (XXX) XXX-XX-XX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@smoothxel.ru</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Режим работы</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Пн-Пт: 9:00 - 18:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Сб-Вс: выходной</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>© 2025 SMOOTHXEL. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
