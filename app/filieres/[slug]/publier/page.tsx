type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">
        Publier un contenu – Filière {params.slug}
      </h1>
      <p className="text-gray-600">
        Interface de publication à implémenter.
      </p>
    </div>
  );
}