import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
export const dynamic = 'force-dynamic';

export default async function AudiencesPage() {
  const audiences = await prisma.savedAudience.findMany();

  async function createAudience(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name) return;
    await prisma.savedAudience.create({
      data: {
        name,
        members: [] // You would typically have a UI to select members
      }
    });
    revalidatePath("/audiences");
  }

  async function deleteAudience(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.savedAudience.delete({ where: { id } });
    revalidatePath("/audiences");
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Saved Audiences</h1>
      <p className="mb-6 text-gray-600">Create custom lists of people to target announcements to.</p>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
        <h2 className="font-semibold mb-4 text-gray-800">Create New Audience</h2>
        <form action={createAudience} className="flex gap-4">
          <input 
            type="text" 
            name="name" 
            placeholder="E.g., HR Committee"
            required
            className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Create
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-3 italic">* Member selection UI will be added in a future update.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 border-b">
            <tr>
              <th className="px-6 py-4 font-semibold">Audience Name</th>
              <th className="px-6 py-4 font-semibold text-center">Members Count</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-800">
            {audiences.map((aud: any) => (
              <tr key={aud.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{aud.name}</td>
                <td className="px-6 py-4 text-center">{aud.members.length}</td>
                <td className="px-6 py-4 text-right">
                  <form action={deleteAudience}>
                    <input type="hidden" name="id" value={aud.id} />
                    <button type="submit" className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {audiences.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No saved audiences yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
