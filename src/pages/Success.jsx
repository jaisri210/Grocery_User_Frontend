import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // optional icon

export const Success = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white border rounded-lg shadow-sm max-w-md w-full p-6 text-center">
        {/* ICON */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={64} className="text-green-600" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-2">
          Order Placed Successfully!
        </h1>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-6">
          Thank you for shopping with{" "}
          <span className="font-medium">Harvest Door</span>. Your order has been
          confirmed and will be delivered soon.
        </p>

        {/* ORDER INFO (OPTIONAL) */}
        <div className="bg-gray-50 border rounded p-3 text-sm mb-6">
          <p>
            <span className="text-gray-500">Order ID:</span>{" "}
            <span className="font-medium">
              HD{Math.floor(Math.random() * 100000)}
            </span>
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="bg-[#5e8741] text-white py-3 rounded text-center hover:bg-green-950"
          >
            Go to Home
          </Link>

          <Link
            to="/shop"
            className="border border-[#5e8741] text-[#5e8741] py-3 rounded text-center hover:bg-gray-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
