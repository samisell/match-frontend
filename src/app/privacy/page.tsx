import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-headline mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-muted-foreground">
            <p>
                Your privacy is important to us. It is HeartCraft's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
            </p>
            
            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Information We Collect</h2>
            <p>
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
            </p>
            <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">How We Use Your Information</h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                <li>Send you emails</li>
                <li>Find and prevent fraud</li>
            </ul>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Log Files</h2>
            <p>
                HeartCraft follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Security</h2>
            <p>
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
            </p>
            <p>
                We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Links to Other Sites</h2>
            <p>
                Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Your Consent</h2>
            <p>
                You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
            </p>
            <p>
                Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
            </p>
             <p>This policy is effective as of 1 January 2024.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
