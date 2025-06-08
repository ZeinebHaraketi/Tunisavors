"use client";

import { Users, UserPlus, CalendarCheck, Wallet } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Touristes */}
      <Card className="bg-orangebrule text-blue-700	 shadow-md">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold">Tourists</h3>
            <Users size={24} />
          </div>
          <p className="text-3xl font-bold">128</p>
        </CardContent>
      </Card>

      {/* Locaux */}
      <Card className="bg-vertolive text-blue-700 shadow-md">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold">Hosts</h3>
            <UserPlus size={24} />
          </div>
          <p className="text-3xl font-bold">45</p>
        </CardContent>
      </Card>

      {/* Réservations */}
      <Card className="bg-rougebrique text-blue-700 shadow-md">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold">Reservations</h3>
            <CalendarCheck size={24} />
          </div>
          <p className="text-3xl font-bold">92</p>
        </CardContent>
      </Card>

      {/* Revenus */}
      <Card className="bg-beigesable text-blue-700 shadow-md">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold">Income</h3>
            <Wallet size={24} />
          </div>
          <p className="text-3xl font-bold">1 540 DT</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCards;
