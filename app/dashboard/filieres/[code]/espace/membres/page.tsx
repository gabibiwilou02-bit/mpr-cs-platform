type PageProps = {
  params: {
    code: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Membres de la filière {params.code}
      </h1>
      <p className="text-gray-600">
        Gestion des membres – fonctionnalité à compléter.
      </p>
    </div>
  );
}