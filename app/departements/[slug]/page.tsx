type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Département : {params.slug}
      </h1>
      <p className="text-gray-600">
        Tableau de bord du département.
      </p>
    </div>
  );
}