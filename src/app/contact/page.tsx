import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactForm } from '@/components/forms/contact-form';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'contact-hero');

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Page Header */}
        <section className="relative bg-secondary/50 py-20">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl} 
              alt={heroImage.description} 
              fill 
              className="object-cover opacity-20"
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="container relative text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline">Get in Touch</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We're here to help. Whether you have a question about our service or need support, please don't hesitate to reach out.
            </p>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-3">
                <h2 className="text-3xl font-bold font-headline mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold font-headline mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Email</h3>
                      <p className="text-muted-foreground">General Inquiries & Support</p>
                      <a href="mailto:support@heartcraft.com" className="text-primary hover:underline">support@heartcraft.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Phone</h3>
                      <p className="text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                      <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-full mt-1">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Office</h3>
                      <p className="text-muted-foreground">123 Love Lane,</p>
                      <p className="text-muted-foreground">Suite 100, Union City, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
