import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { filter } from "lodash";
import Link from "next/link";
import { Icon } from "@iconify/react";
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
} from "@mui/material";

import Scrollbar from "@/lib/table/Scrollbar";
import ListHead from "@/lib/table/ListHead";
import ListToolbar from "@/lib/table/ListToolbar";
import SearchNotFound from "@/lib/table/SearchNotFound";
import Image from "next/image";
import DeleteBrand from "@/components/pages/partners/brand/deleteBrand";

const TABLE_HEAD = [
  { id: "Thai", label: "Thai", alignRight: true },
  { id: "Eng", label: "Eng", alignRight: false },
  { id: "Cambodia", label: "Cambodia", alignRight: false },
  { id: "Myanmar", label: "Myanmar", alignRight: false },
  { id: "Laos", label: "Laos", alignRight: false },
  { id: "China", label: "China", alignRight: false },
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
        _user.brand_name.Thai.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.brand_name.Eng.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.brand_name.Cambodia.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.brand_name.Myanmar.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.brand_name.Laos.toLowerCase().indexOf(query.toLowerCase()) !==
          -1 ||
        _user.brand_name.China.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Blogs() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [isBrand, setBrand] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (currentUser) {
      fetcherBrand();
    }
  }, [currentUser]);

  const fetcherBrand = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/brand`;
    await fetcherWithToken(url)
      .then((json) => {
        setBrand(json.data);
      })
      .catch(() => setBrand([]));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = isBrand.map((n) => n._id);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isBrand.length) : 0;
  const filteredList = applySortFilter(
    isBrand,
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
            รายชื่อแบรนด์สินค้า
          </Typography>
          <Link href={"/partners/brand/create"}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "12px" }}
            >
              เพิ่มแบรนด์สินค้า
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
                  rowCount={isBrand.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, brand_image, brand_name } = row;
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
                                alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/brand/${brand_image}`}
                                src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/brand/${brand_image}`}
                                width={40}
                                height={40}
                                objectFit="cover"
                                quality={20}
                              />
                              <Typography variant="subtitle2" noWrap>
                                <div style={{ color: "orange" }}>
                                  {brand_name.Thai}
                                </div>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  {brand_name.Thai}
                                </div>
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {brand_name.Eng}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {brand_name.Cambodia}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {brand_name.Myanmar}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {brand_name.Laos}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {brand_name.China}
                            </div>
                          </TableCell>
                          <TableCell display="flex">
                            <Link
                              href={{
                                pathname: "/partners/brand/edit/[id]",
                                query: {
                                  id: row._id,
                                  company_id: row.brand_company_id,
                                },
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
                            <DeleteBrand
                              row={row}
                              fetcherBrand={fetcherBrand}
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
