import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-headline mb-8">Terms of Service</h1>
          <div className="space-y-6 text-muted-foreground">
            <p>
              Welcome to HeartCraft! These terms and conditions outline the rules and regulations for the use of HeartCraft's Website, located at heartcraft.com.
            </p>
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use HeartCraft if you do not agree to take all of the terms and conditions stated on this page.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Cookies</h2>
            <p>
              We employ the use of cookies. By accessing HeartCraft, you agreed to use cookies in agreement with the HeartCraft's Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">License</h2>
            <p>
              Unless otherwise stated, HeartCraft and/or its licensors own the intellectual property rights for all material on HeartCraft. All intellectual property rights are reserved. You may access this from HeartCraft for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <p>You must not:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Republish material from HeartCraft</li>
              <li>Sell, rent or sub-license material from HeartCraft</li>
              <li>Reproduce, duplicate or copy material from HeartCraft</li>
              <li>Redistribute content from HeartCraft</li>
            </ul>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">User Comments</h2>
             <p>This Agreement shall begin on the date hereof.</p>
            <p>
              Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. HeartCraft does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of HeartCraft,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, HeartCraft shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
            </p>
            <p>
              HeartCraft reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
            </p>

            <h2 className="text-2xl font-bold font-headline text-foreground pt-4">Disclaimer</h2>
            <p>
              To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
            </p>
            <ul className="list-disc list-inside space-y-2">
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>
                The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.
            </p>
             <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
