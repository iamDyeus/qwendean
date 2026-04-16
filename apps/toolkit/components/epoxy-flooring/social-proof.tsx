import React from "react";

const logos = [
  {
    image: "/placeholder.svg",
    label: "State Transport Corp.",
  },
  {
    image: "/placeholder.svg",
    label: "FSSAI-Reg. Cold Storage",
  },
  {
    image: "/placeholder.svg",
    label: "Municipal Warehouse Authority",
  },
  {
    image: "/placeholder.svg",
    label: "Large Format Retail Chain",
  },
  {
    image: "/placeholder.svg",
    label: "State Highway & Transportation",
  },
  {
    image: "/placeholder.svg",
    label: "Ministry of Public Works",
  },
];

const SocialProofBar = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="bg-gray-100 border-b border-gray-100">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4 py-6">
              <p className="text-sm text-gray-400">Trusted by</p>
              <div className="flex items-center gap-6">
                {logos.map((logo, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 rounded-full border border-transparent"
                  >
                    <img
                      src={logo.image}
                      alt="logo"
                      className="h-10 w-10 object-cover"
                    />
                    <p className="text-xs text-gray-400 ml-1">{logo.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 py-6">
              <div className="bg-gray-200 rounded-full border border-gray-200 text-xs font-medium leading-3">
                500+
              </div>
              <div className="border-l border-gray-300 bg-gray-200 flex items-center gap-2 rounded-full border border-gray-200 px-2 py-1 text-xs font-medium leading-3">
                <span>18</span>
                <span>States</span>
              </div>
              <div className="bg-gray-200 rounded-full border border-gray-200 text-xs font-medium leading-3">
                Zero
                <br />
                Compliance
                <br />
                Failures
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SocialProofBar };
