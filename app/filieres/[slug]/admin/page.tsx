type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Administration – Filière {params.slug}
      </h1>
      <p className="text-gray-600">
        Paramètres et gestion administrative de la filière.
      </p>
    </div>
  );
}