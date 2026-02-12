import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { howItWorksSteps } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "Is my profile public?",
    answer: "No. Your privacy is our top priority. Your profile is completely confidential and is only seen by our internal matchmaking team and the specific individuals we match you with."
  },
  {
    question: "How long does it take to get a match?",
    answer: "The timeline varies as we focus on quality over speed. It can take anywhere from a few weeks to a couple of months. We will keep you updated on our progress."
  },
  {
    question: "What happens after I get a match?",
    answer: "Once you and your match both express interest, we can facilitate the sharing of contact information. From there, it's up to you to connect and see where it goes! Our team is available for guidance if you need it."
  },
  {
    question: "Who is this platform for?",
    answer: "HeartCraft is for commitment-minded individuals, typically professionals, who are tired of the impersonal nature of swipe-based dating apps and are ready to invest in finding a serious, long-term relationship."
  }
];

export default function HowItWorksPage() {
  const visualImage = PlaceHolderImages.find(p => p.id === 'how-it-works-visual');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-secondary/50 py-20 text-center">
          <div className="container">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">How HeartCraft Works</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              A simple, dignified, and effective path to finding your partner.
            </p>
          </div>
        </section>

        {/* Step-by-step process Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center gap-8 my-12">
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="mb-4">
                      <span className="text-primary font-bold">STEP {index + 1}</span>
                      <h2 className="text-3xl font-bold font-headline mt-1">{step.title}</h2>
                    </div>
                    <p className="text-muted-foreground text-lg">{step.description}</p>
                  </div>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                     <div className="bg-primary/10 text-primary p-6 rounded-xl flex items-center justify-center aspect-square max-w-xs mx-auto">
                       <step.icon className="w-24 h-24" />
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Timeline Section */}
        {visualImage && <section className="py-10">
            <div className="container">
                <div className="relative h-48 md:h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image 
                        src={visualImage.imageUrl}
                        alt={visualImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={visualImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <h2 className="text-3xl md:text-5xl font-bold font-headline text-white text-center">Your Journey, Guided by Experts</h2>
                    </div>
                </div>
            </div>
        </section>}

        {/* FAQ Section */}
        <section className="py-20">
            <div className="container max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-headline">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left font-bold">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-base">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>


        {/* CTA Banner */}
        <section className="py-20 bg-secondary/50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold font-headline">Ready to Begin?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              The most important investment you can make is in your happiness. Let us be your trusted partner in finding it.
            </p>
            <Button asChild size="lg">
              <Link href="/register">Create Your Private Profile</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
