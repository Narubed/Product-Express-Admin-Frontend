import useCurrentUser from "@/lib/hook/useCurrentUser";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { filter } from "lodash";
import Link from "next/link";
import { Icon } from "@iconify/react";
import numeral from "numeral";
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
import CardMenu from "@/components/pages/common/main/CardMenuList";
import DeleteBrand from "@/components/pages/partners/brand/deleteBrand";
import { Image } from "primereact/image";
import CalendarPreOrders from "./common/main/CalendarPreOrders";
const TABLE_HEAD = [
  { id: "po_number", label: "ไอดี/ชื่อผู้ทำรายการ", alignRight: true },
  {
    id: "partner_name",
    label: "ชื่อพาร์ทเนอร์ที่รับสินค้า",
    alignRight: false,
  },
  { id: "po_total", label: "ยอดรวม", alignRight: false },
  { id: "po_silp", label: "Slip", alignRight: false },
  { id: "po_status", label: "สถานะ/วันที่", alignRight: true },
  { id: "button", label: "ตัวเลือก", alignRight: false },
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
        _user.member_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.partner_name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.po_status.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.po_number.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Blogs() {
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [isPreOrders, setPreOrders] = useState([]);
  const [isOldPreOrders, setOldPreOrders] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (currentUser) {
      fetcherPreOrders();
    }
  }, [currentUser]);

  const fetcherPreOrders = async () => {
    const urlPreOrders = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/pre_orders`;
    const urlPartners = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
    const urlMembers = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/members`;
    let preorders = [];
    let partners = [];
    let members = [];
    await fetcherWithToken(urlPreOrders).then(async (json) => {
      preorders = json.data;
    });
    await fetcherWithToken(urlPartners).then(async (json) => {
      partners = json.data;
    });
    await fetcherWithToken(urlMembers).then(async (json) => {
      members = json.data;
    });
    const newPreOrders = [];

    if (
      preorders.length !== 0 &&
      partners.length !== 0 &&
      members.length !== 0
    ) {
      const newPoPartners = [];
      preorders.forEach((element) => {
        const finded = partners.find(
          (item) => item._id === element.po_partner_id
        );
        if (finded) {
          newPoPartners.push({ ...element, partner_name: finded.partner_name });
        }
      });

      newPoPartners.forEach((element) => {
        const finded = members.find(
          (item) => item._id === element.po_member_id
        );
        if (finded) {
          newPreOrders.push({ ...element, member_name: finded.members_name });
        }
      });
    }
    setOldPreOrders(newPreOrders.reverse());
    setPreOrders(newPreOrders);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = isPreOrders.map((n) => n._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isPreOrders.length) : 0;
  const filteredList = applySortFilter(
    isPreOrders,
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
            รายงานทั้งหมด
          </Typography>
          {/* <Link href={"/partners/brand/create"}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ fontSize: "12px" }}
            >
              เพิ่มแบรนด์สินค้า
            </Button>
          </Link> */}
        </Stack>

        <Card>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <CalendarPreOrders
              isPreOrders={isPreOrders}
              setPreOrders={setPreOrders}
              isOldPreOrders={isOldPreOrders}
            />
            <ListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
              selected={selected}
            />
          </div>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 360 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={isPreOrders.length}
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
                        member_name,
                        partner_name,
                        po_number,
                        po_total,
                        po_silp,
                        po_status,
                        po_timestamp,
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
                                <div style={{ color: "orange" }}>
                                  {member_name}
                                </div>
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                  }}
                                >
                                  {po_number}
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
                              {partner_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {numeral(po_total).format("0,0.00")}
                            </div>
                          </TableCell>
                          <TableCell>
                            {po_silp !== "ไม่มี" && (
                              <div style={{ width: 40 }}>
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/pre-order/${po_silp}`}
                                  alt={`${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/static/images/pre-order/${po_silp}`}
                                  width="100%"
                                  preview
                                />
                              </div>
                            )}
                          </TableCell>
                          <TableCell
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="subtitle2" noWrap>
                              <div
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "14px",
                                }}
                              >
                                {po_status === "รอชำระเงิน" && (
                                  <Chip label={po_status} color="primary" />
                                )}
                                {(po_status === "ผู้ใช้ยกเลิก" ||
                                  po_status === "ผู้ดูแลยกเลิก") && (
                                  <Chip label={po_status} color="error" />
                                )}
                                {po_status === "รอตรวจสอบ" && (
                                  <Chip label={po_status} color="secondary" />
                                )}
                                {po_status === "ตรวจสอบสำเร็จ" && (
                                  <Chip label={po_status} color="success" />
                                )}
                                {po_status === "ตัดรอบการจัดส่งแล้ว" && (
                                  <Chip label={po_status} color="info" />
                                )}
                                
                              </div>
                              <div style={{ color: "orange" }}>
                                {dayjs(
                                  po_timestamp[po_timestamp.length - 1]
                                    .timestamp
                                )
                                  .locale("th")
                                  .format("DD MMMM YYYY HH:mm")}
                              </div>
                            </Typography>
                          </TableCell>

                          <TableCell display="flex">
                            <CardMenu
                              currentUser={currentUser}
                              fetcherPreOrders={fetcherPreOrders}
                              row={row}
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
