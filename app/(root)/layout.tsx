import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <section className="min-h-[calc(100dvh-6rem)] w-full ">
        {children}
      </section>
    </>
  );
}
