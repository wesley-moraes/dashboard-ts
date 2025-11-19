interface HeaderProps {
  periodType: string;
  periodLabels: any;
}

export default function Header({ periodType, periodLabels }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Monitor Financeiro
          <span className="text-blue-600 ml-2">{`- ${periodLabels[periodType]}`}</span>
        </h1>
      </div>
    </header>
  );
}