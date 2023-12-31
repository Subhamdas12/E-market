import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllProducts } from "../../features/product/productSlice";
import { StarIcon } from "@heroicons/react/20/solid";
import { discountedPrice } from "../../services/Commons";

export default function AdminProductList() {
  const products = useSelector(selectAllProducts);
  return (
    <div className="bg-white">
      <div className="mt-6">
        <Link
          to="/admin/product-form"
          className="flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Add new product
        </Link>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product, index) => (
            <div>
              <Link to={`/productOverview/${product.id}`} key={product.id}>
                <div
                  key={product.id}
                  className="group relative border-solid border-2 p-2 border-gray-200"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <div href={product.thumbnail}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </div>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 ">
                        <StarIcon className="w-6 h-6 inline"></StarIcon>
                        <span className="align-bottom">{product.rating}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        $ {discountedPrice(product)}
                      </p>
                      <p className="text-sm font-medium line-through text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                  {product.deleted && (
                    <div>
                      <p className="text-sm text-red-400">product deleted</p>
                    </div>
                  )}
                  {product.stock <= 0 && (
                    <div>
                      <p className="text-sm text-red-400">out of stock</p>
                    </div>
                  )}
                </div>
              </Link>
              <div className="mt-6">
                <Link
                  to={`/admin/product-form/edit/${product.id}`}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Edit product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
