"use client";

//import Image from "next/image";

export default function Section2() {
  return (
    <div className="relative w-full h-[80vh]">
      {/* fond décoratif flouté */}
      <div
        className="absolute inset-0 z-0 opacity-60 blur-2xl pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to top, #282421, #543a26, #83502b, #563723, #41210d)",
        }}
      />

      {/* contenu visible */}
      <div className="h-[80vh]  grid items-center ">
        <div className="relative z-10  grid grid-cols-2 justify-center md:justify-between items-center  px-6 py-4 text-white text-sm">
          <div className="border-[#e2ddd9] p-6">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
          <div className="border-l border-[#e2ddd9] p-6">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
          <div className=" border-t border-[#e2ddd9] p-6">
            <h2>Daily Transit</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium odit eius debitis doloremque ducimus consectetur ea
              ipsum. A, quaerat ipsa suscipit similique et impedit, sit
              dignissimos facilis animi iste debitis?
            </p>
          </div>
          <div className="border-l border-t border-[#e2ddd9] p-6">
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
  );
}
