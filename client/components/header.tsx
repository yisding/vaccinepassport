interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-blue-500 p-4 text-center text-white text-2xl">
      <h1>{title}</h1>
    </header>
  );
}
