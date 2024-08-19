import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center"> 
        <Image
          src="/under.jpg" 
          alt="Example Image"
          height={0}
          width={950}
        /> 
    </main>
  );
}
