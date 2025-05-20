"use client";

import Image from "next/image";

export default function Section3() {
  return (
    <div className="h-[80vh] border-[#41210d]">
      {/* fond décoratif flouté */}

      {/* contenu visible */}
      <div className="h-[80vh]  grid items-center ">
        <h1 className="md:text-[2.5rem] text-center text-2xl font-extrabold text-[#EED1B4] drop-shadow-[0_0_10px_rgba(239,134,68,0.5)] leading-tight">
          Decouvre en plus sur toi
        </h1>
        <div className=" grid grid-cols-3 justify-center justify-items-center md:justify-between items-center  px-6 py-4 text-white text-sm">
          <div>
            <div className="border rounded-[5px] border-[#ef8644] p-6">
              <h2>Daily Transit</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium odit eius debitis doloremque ducimus consectetur ea
                ipsum. A, quaerat ipsa suscipit similique et impedit, sit
                dignissimos facilis animi iste debitis?
              </p>
            </div>
            <div className="border rounded-[5px] mt-2 border-[#ef8644] p-6">
              <h2>Daily Transit</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium odit eius debitis doloremque ducimus consectetur ea
                ipsum. A, quaerat ipsa suscipit similique et impedit, sit
                dignissimos facilis animi iste debitis?
              </p>
            </div>
          </div>

          <div>
            <Image
              src="/assets/phone3.webp"
              alt="Phone"
              width={350}
              height={350}
            />
          </div>

          <div>
            <div className=" border rounded-[5px] border-[#ef8644] p-6">
              <h2>Daily Transit</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium odit eius debitis doloremque ducimus consectetur ea
                ipsum. A, quaerat ipsa suscipit similique et impedit, sit
                dignissimos facilis animi iste debitis?
              </p>
            </div>
            <div className="border rounded-[5px] mt-2 border-[#ef8644] p-6">
              <h2>Daily Transit</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium odit eius debitis doloremque ducimus consectetur ea
                ipsum. A, quaerat ipsa suscipit similique et impedit, sit
                dignissimos facilis animi iste debitis?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
