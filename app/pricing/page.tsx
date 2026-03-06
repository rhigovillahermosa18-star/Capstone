export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#e8c1cc] flex justify-center items-center">

      <div className="bg-white p-8 rounded-xl w-80 shadow-md text-center">
        <h2 className="text-xl font-semibold mb-4">Pricing</h2>

        <div className="mb-4">
          <h3 className="font-bold">Plain Set</h3>
          <p>Short - 400</p>
          <p>Medium - 450</p>
          <p>Long - 500</p>
        </div>

        <div>
          <h3 className="font-bold">Basic Set</h3>
          <p>Short - 450</p>
          <p>Medium - 500</p>
          <p>Long - 550</p>
        </div>

      </div>
    </div>
  );
}