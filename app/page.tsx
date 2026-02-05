"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Toaster } from "sonner";
import { debounce } from "@tanstack/pacer";

export default function Home() {
  function SendRequest(tableStr: string, request: string) {
    const table = parseInt(tableStr);
    fetch('https://api-decypher.ccstiet.com/api/collections/complains/records', {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ table_number: table, complaint: request })
    }).then((r) => {
      if (Math.floor(r.status / 100) != 2) {
        toast("Failed to submit request");
        return;
      }
      toast("Request submitted");
    }).catch(() => {
      toast("Failed to submit request");
    });
  }
  const DebouncedSendRequest = debounce(SendRequest, {
    wait: 500,
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <div className="text-4xl font-bold">HackTU Assistance Portal</div>
        <form className="flex flex-col gap-4 items-center w-1/2" onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const table = formData.get("table")!;
          const request = formData.get("request")!;
          DebouncedSendRequest(table.toString(), request.toString());
        }}>
          <Field>
            <FieldLabel htmlFor="email">Table Number</FieldLabel>
            <Input
              id="table"
              name="table"
              type="number"
              className="text-center"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Request</FieldLabel>
            <Input
              id="request"
              name="request"
              type="text"
              className="text-center"
              required
            />
          </Field>
          <Button>Ask for Assistance</Button>
        </form>
        <div></div>
      </main>
      <Toaster />
    </div>
  );
}
