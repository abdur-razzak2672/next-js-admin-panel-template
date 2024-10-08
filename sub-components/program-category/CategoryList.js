import { Row, Col, Card, Table, Image } from "react-bootstrap";
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import ApiService from '../../utils/ApiServices';
import ApiUrl from '../../utils/ApiUrl';
import Loader from '../Spinner';
import { toast } from "react-toastify";
import Link from "next/link";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);
  
  const getCategoriesList = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getApiService(ApiUrl.GET_CATEGORY_LIST);
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (isConfirmed) {
      try {
        setDeletingCategoryId(id);
        console.log("Deleting category with ID:", id);
        const response = await ApiService.deleteApiService(`${ApiUrl.DELETE_CATEGORY}/${id}`);
        if (response?.statusCode === 200) {
          toast.success("Category deleted successfully");
          getCategoriesList();
        } else {
          console.error("Failed to delete category:", response.message);
          console.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error.message);
        console.error("An error occurred while deleting the category");
      } finally {
        setDeletingCategoryId(null);
      }
    } else {
      console.log("Category deletion canceled");
    }
  };
  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4 ">
            <h4 className="mb-0">Category List</h4>
            <h4 className="mb-0">Total Category : {categories?.totalData ? categories?.totalData : 0} </h4>
          </Card.Header>
          {loading ? (
            <span className="p-5"> <Loader loading={loading} /></span>
          ) : (
            <>
              <Table responsive className="text-nowrap mb-5">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.results?.length > 0 ? (
                    categories?.results?.map((category, index) => {
                      return (
                        <tr key={index}>
                          <th className="align-middle" scope="row">{index + 1}</th>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <div>
                                <div className={`icon-shape icon-md border p-4 rounded  bg-white`}>
                                  <Image className="rounded" style={{ width: "50px", height: "50px", objectFit: "cover" }} src={category.image} alt="" />
                                </div>
                              </div>
                              <div className="ms-3 lh-1">
                                <h5 className=" mb-1">
                                  <Link href="#" className="text-inherit">{category.title}</Link></h5>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">{category.description}</td>
                          <td className="align-middle">

                            <div className="d-flex">
                              <Link className="me-2" href={`/program-category/update-category/${category?._id}`}>
                                <PencilSquare
                                  className="text-success"
                                  style={{ cursor: 'pointer' }}
                                />
                              </Link>

                              {deletingCategoryId === category?._id ? (
                                <Loader loading={true} width="15px" top="0px" borderWidth="3px" />) : (
                                <Trash
                                  className="text-danger mt-1"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => handleDelete(category?._id)}
                                />)}
                            </div>

                          </td>
                        </tr>
                      )
                    })) : (
                    <tr>
                      <td className="text-center" colSpan="5">No categories found.</td>
                    </tr>
                  )
                  }
                </tbody>
              </Table>
            </>

          )}
        </Card>
      </Col>
    </Row>
  );
};

export default CategoryList;
