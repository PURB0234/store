'use client';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { useEffect, useState } from "react";

export default function ListProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">📦 Product List</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nama Barang</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Kategori</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Stok</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Harga</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{product.nama_barang}</td>
                <td className="px-6 py-4">{product.kategori_barang}</td>
                <td className="px-6 py-4">{product.stok}</td>
                <td className="px-6 py-4">Rp. {product.harga_barang}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
