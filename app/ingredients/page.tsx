"use client";
import Breadcrumb from "@/components/ui/breadcrumb";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import {
  Plus,
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MOCK_INGREDIENTS } from "@/lib/contants";

export default function IngredientsList() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(MOCK_INGREDIENTS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = MOCK_INGREDIENTS.slice(startIndex, endIndex);

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    }
  };

  return (
    <>
      <Breadcrumb items={[{ label: "Ingredient", href: "/ingredients" }]} />
      <div className="bg-foreground p-6 rounded-2xl flex flex-col gap-6">
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold">Ingredients List</h1>
            <div className="flex items-center justify-between flex-1">
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Search here"
                  showSearchIcon
                  className="flex-1 bg-light-gray/50 border-0 rounded-xl text-sx py-2 text-primary font-medium"
                />
                <Button variant="secondary" className="w-9 h-9  rounded-xl">
                  <Plus size={20} className="mx-auto" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="secondary" className="w-9 h-9 rounded-xl">
                  <Download size={20} className="mx-auto" />
                </Button>
                <Button variant="secondary" className="w-9 h-9 rounded-xl">
                  <ArrowUpDown size={20} className="mx-auto" />
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="max-h-[250px] overflow-y-scroll">
            <table className="w-full">
              <thead className="sticky top-0 z-10 bg-foreground shadow-[-1px_1px_0_0_rgba(0,0,0,0.1)]">
                <tr>
                  <th className="px-4 py-2.5  text-left text-xs font-medium">
                    Ingredients
                  </th>
                  <th className="px-4 py-2.5  text-left text-xs font-medium">
                    Description
                  </th>
                  <th className="px-4 py-2.5  text-left text-xs font-medium">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="before:content-[''] before:block before:h-2">
                {currentItems.map((ingredient) => (
                  <tr key={ingredient.id} className="hover:bg-light-gray/10">
                    <td className="px-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(ingredient.id)}
                          onChange={(e) =>
                            handleSelectItem(ingredient.id, e.target.checked)
                          }
                          className="w-3 h-3 cursor-pointer rounded-full appearance-none border border-[#6E6E6E] checked:bg-primary checked:border-primary relative
                          after:content-[''] after:absolute after:left-[2.5px] after:top-[1px] after:w-[3px] after:h-[6px] after:border-white after:border-r-[1.5px] after:border-b-[1.5px]
                          after:rotate-45 after:hidden checked:after:block"
                        />
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                          <Image
                            src={ingredient.image}
                            alt={ingredient.name}
                            width={20}
                            height={20}
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-primary">
                          {ingredient.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 text-black text-sm">
                      {ingredient.description}
                    </td>
                    <td
                      className={
                        "px-4 text-xs font-bold " +
                        (ingredient.status === "Active"
                          ? "text-primary"
                          : "text-danger")
                      }
                    >
                      {ingredient.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex items-center gap-1 ml-auto">
            <Button
              variant="ghost"
              className="w-6 h-6 rounded-xl text-black"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <ChevronLeft size={10} className="mx-auto" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={"ghost"}
                className="w-6 h-6 rounded-sm border-primary text-xs text-gray"
                outlined={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                <span className="text-xs">{page}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-6 h-6 rounded-xl text-black"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <ChevronRight size={10} className="mx-auto" />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
