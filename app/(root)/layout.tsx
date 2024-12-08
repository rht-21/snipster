import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <section className="min-h-[calc(100dvh-9rem)] h-full w-full px-m bg-wavy-line-home-svg bg-cover bg-no-repeat bg-center">
        {children}
      </section>
      <Footer />
    </>
  );
}
