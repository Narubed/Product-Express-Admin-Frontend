import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { filter } from "lodash";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/lib/store/loading";
import Swal from "sweetalert2";
// material
import {
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Stack,
  Typography,
  Container,
  Card,
  TablePagination,
  Chip,
  IconButton,
  Switch,
} from "@mui/material";

import Scrollbar from "@/lib/table/Scrollbar";
import ListHead from "@/lib/table/ListHead";
import ListToolbar from "@/lib/table/ListToolbar";
import SearchNotFound from "@/lib/table/SearchNotFound";
import Image from "next/image";
import DeleteProduct from "./deleteProduct";

const TABLE_HEAD = [
  { id: "รายชื่อสินค้า", label: "รายชื่อสินค้า", alignRight: true },

  { id: "ประเภทสินค้า", label: "ประเภทสินค้า", alignRight: false },

  { id: "product_tag", label: "Tag", alignRight: false },
  { id: "Status", label: "สถานะ", alignRight: false },

  { id: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;

    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.product_name.Eng.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.product_name.Thai.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.product_tag.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Products() {
  const dispatch = useDispatch();
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [isProducts, setProducts] = useState([]);
  const [isTypes, setTypes] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDateSelect, setDateSelect] = useState(["", ""]);
  const [isReports, setReports] = useState([]);

  useEffect(() => {
    if (currentUser) {
      fetcherProducts();
      fetcherTypes();
    }
  }, [currentUser]);

  const fetcherProducts = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products`;
    await fetcherWithToken(url)
      .then((json) => {
        setProducts(json.data);
      })
      .catch(() => setProducts([]));
  };

  const fetcherTypes = async () => {
    const urlTypes = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/type`;
    await fetcherWithToken(urlTypes)
      .then((json) => {
        setTypes(json.data);
      })
      .catch(() => setTypes([]));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = isProducts.map((n) => n._id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleSwicthStatus = async (props) => {
    dispatch(setLoading(true));
    const { row, event } = props;
    const data = {
      product_status: event.target.checked,
    };
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/products/${row._id}`;
    await fetcherWithToken(url, { method: "PUT", body: JSON.stringify(data) })
      .then((json) => {
        dispatch(setLoading(false));
        fetcherProducts();
      })
      .catch(() => {
        dispatch(setLoading(false));
        Swal.fire({
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isProducts.length) : 0;
  const filteredList = applySortFilter(
    isProducts,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredList.length === 0;

  return (
    <div>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
            สินค้าทั้งหมด
          </Typography>
          <Link href={"/products/types/create"}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "12px" }}
            >
              เพิ่มสินค้าใหม่
            </Button>
          </Link>
        </Stack>
        <Card>
          <ListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            selected={selected}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 360 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={isProducts.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        _id,
                        product_images,
                        product_name,
                        product_detail,
                        product_size_name,
                        product_status,
                        product_tag,
                        product_type_id,
                      } = row;
                      const isItemSelected = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell />
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Image
                                alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product_images[0]}`}
                                src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/products/${product_images[0]}`}
                                width={40}
                                height={40}
                                objectFit="cover"
                                quality={20}
                              />
                              <Typography variant="subtitle2" noWrap>
                                <div style={{ color: "orange" }}>
                                  {product_name.Eng}
                                </div>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  {product_name.Thai}
                                </div>
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            {product_type_id.map((item) => {
                              const value = isTypes.find(
                                (value) => value._id === item
                              );
                              return (
                                <a key={item}>
                                  {value?.type_name?.Thai} <br />
                                </a>
                              );
                            })}
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {product_tag}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              display="flex"
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                                justifyItems: "center",
                              }}
                            >
                              <Switch
                                color="secondary"
                                onChange={(event) =>
                                  handleSwicthStatus({ event, row })
                                }
                                checked={product_status}
                              />

                              {product_status ? "ONLINE" : "OFFLINE"}
                            </div>
                          </TableCell>

                          <TableCell display="flex">
                            <Link
                              href={{
                                pathname: "/products/edit/[id]",
                                query: { id: row._id },
                              }}
                            >
                              <IconButton
                                color="secondary"
                                aria-label="add an alarm"
                              >
                                <Icon
                                  icon="ooui:recent-changes-ltr"
                                  width="24"
                                  height="24"
                                />
                              </IconButton>
                            </Link>
                            <DeleteProduct
                              row={row}
                              fetcherProducts={fetcherProducts}
                              fetcherTypes={fetcherTypes}
                              fetcherWithToken={fetcherWithToken}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            sx={{
              ".MuiTablePagination-toolbar": {
                fontSize: 16,
                backgroundColor: "rgb(222,222,222)",
                color: "rgb(41, 39, 39)",
              },
              ".MuiTablePagination-displayedRows": {
                fontSize: 16,
                m: "auto",
              },
              ".MuiTablePagination-selectLabel": {
                fontSize: 16,
                m: "auto",
              },
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={filteredList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </div>
  );
}
