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
  Switch,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/lib/store/loading";
import Scrollbar from "@/lib/table/Scrollbar";
import ListHead from "@/lib/table/ListHead";
import ListToolbar from "@/lib/table/ListToolbar";
import SearchNotFound from "@/lib/table/SearchNotFound";
import Image from "next/image";
import DeleteBrand from "@/components/pages/partners/brand/deleteBrand";
import Swal from "sweetalert2";

const TABLE_HEAD = [
  { id: "partner_name", label: "ชื่อ", alignRight: false },
  { id: "partner_email", label: "อีเมล", alignRight: false },
  { id: "partner_phone", label: "เบอร์โทรศัพท์", alignRight: false },
  {
    id: "partner_name_center",
    label: "ชื่อที่แสดงให้ผู้ใช้เห็น",
    alignRight: false,
  },
  { id: "status", label: "สถานะ", alignRight: false },
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
        _user.partner_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.partner_email.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.partner_phone.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        // _user.brand_name.Eng.toLowerCase().indexOf(query.toLowerCase()) !==
        //   -1 ||
        // _user.brand_name.Cambodia.toLowerCase().indexOf(query.toLowerCase()) !==
        //   -1 ||
        // _user.brand_name.Myanmar.toLowerCase().indexOf(query.toLowerCase()) !==
        //   -1 ||
        // _user.brand_name.Laos.toLowerCase().indexOf(query.toLowerCase()) !==
        //   -1 ||
        _user.partner_name_center.Thai.toLowerCase().indexOf(
          query.toLowerCase()
        ) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Blogs() {
  const dispatch = useDispatch();
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [isPartners, setPartners] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (currentUser) {
      fetcherPartners();
    }
  }, [currentUser]);

  const fetcherPartners = async () => {
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
    await fetcherWithToken(url)
      .then((json) => {
        console.log(json);
        setPartners(json.data);
      })
      .catch(() => setPartners([]));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = isPartners.map((n) => n._id);
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
      partner_status: event.target.checked,
    };
    const url = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners/${row._id}`;
    await fetcherWithToken(url, { method: "PUT", body: JSON.stringify(data) })
      .then((json) => {
        dispatch(setLoading(false));
        fetcherPartners();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isPartners.length) : 0;
  const filteredList = applySortFilter(
    isPartners,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredList.length === 0;

  return (
    <div>
      <Container sx={{ pt: 2, pb: 6 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
            รายชื่อพาร์ทเนอร์ (Store)
          </Typography>
          <Link href={"/partners/store/create"}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "12px" }}
            >
              เพิ่มพาร์ทเนอร์
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
                  rowCount={isPartners.length}
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
                        partner_name,
                        partner_email,
                        partner_status,
                        partner_phone,
                        partner_address,
                        partner_name_center,
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
                              <Typography variant="subtitle2" noWrap>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  {partner_address.Thai}
                                </div>
                                <div style={{ color: "orange" }}>
                                  {partner_name}
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
                              {partner_email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {partner_phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {partner_name_center.Thai}
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
                                checked={partner_status}
                              />

                              {partner_status ? "ONLINE" : "OFFLINE"}
                            </div>
                          </TableCell>

                          <TableCell display="flex">
                            <Link
                              href={{
                                pathname: "/partners/store/edit/[id]",
                                query: {
                                  id: row._id,
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
                            {/* <DeleteBrand
                              row={row}
                              fetcherBrand={fetcherBrand}
                              fetcherWithToken={fetcherWithToken}
                            /> */}
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
            rowsPerPageOptions={[5, 10, 25]}
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
