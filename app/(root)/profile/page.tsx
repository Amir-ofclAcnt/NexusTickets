import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left ">My Tickets</h3>
          <Button asChild>
            <Link></Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
