function MainDetails({ name, address }) {
  return (
    <section className="flex flex-col items-end justify-end">
        <h2 className="font-bold text-xl md:text-4xl uppercase mb-1">{name}</h2>
        <p>{address}</p>
      </section>
  );
}

export default MainDetails;
