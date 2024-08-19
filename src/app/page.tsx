export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center p-0">
      <video
        className="w-full object-cover"
        controls
        autoPlay
        loop
        muted
        preload="none" 
        style={{ height: '600px' }} // Set your custom height here
      >
        <source src="/vT8KUZ1aLJS6H5Kr2F.mp4" type="video/mp4" />
      </video>
    </main>
  );
}
