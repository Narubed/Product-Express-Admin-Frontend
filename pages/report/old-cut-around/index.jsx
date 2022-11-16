/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { filter } from "lodash";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";

import useCurrentUser from "@/lib/hook/useCurrentUser";
import numeral from "numeral";
import Main from "@/components/main";

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
  Tooltip,
  Switch,
} from "@mui/material";

import Scrollbar from "@/lib/table/Scrollbar";
import ListHead from "@/lib/table/ListHead";
import ListToolbar from "@/lib/table/ListToolbar";
import SearchNotFound from "@/lib/table/SearchNotFound";

const TABLE_HEAD = [
  { id: "_id", label: "รหัสการตัดรอบ", alignRight: false },

  { id: "partner_name", label: "ชื่อพาร์ทเนอร์", alignRight: false },

  { id: "cutaround_timestamp", label: "วันที่ทำการตัดรอบ", alignRight: false },
  { id: "cutaround_transaction", label: "ผู้ทำการตัดรอบ", alignRight: false },

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
        _user._id.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _user.cutaround_transaction
          .toLowerCase()
          .indexOf(query.toLowerCase()) !== -1 ||
        _user.partner_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function index() {
  const dispatch = useDispatch();
  const { fetcherWithToken, currentUser } = useCurrentUser();
  const [isCutAround, setCutAround] = useState([]);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (!currentUser) {
    return (
      <div>
        <Main />
      </div>
    );
  }
  useEffect(() => {
    if (currentUser) {
      fetchCutArount();
    }
  }, [currentUser]);
  const fetchCutArount = async () => {
    try {
      const urlPartners = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/partners`;
      const urlCutAround = `${process.env.NEXT_PUBLIC_PRODUCT_EXPRESS_BACKEND}/cut_around`;
      let partners = [];
      let cutAround = [];
      await fetcherWithToken(urlPartners).then(async (json) => {
        partners = json.data;
      });
      await fetcherWithToken(urlCutAround).then(async (json) => {
        cutAround = json.data;
      });
      const newCutAround = [];
      cutAround.forEach((element) => {
        const findPartner = partners.find(
          (item) => item._id === element.cutaround_partner_id
        );
        if (findPartner) {
          newCutAround.push({
            ...element,
            partner_name: findPartner.partner_name,
          });
        }
      });
      console.log(newCutAround);
      setCutAround(newCutAround.reverse());
    } catch (err) {
      setCutAround([]);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = isCutAround.map((n) => n._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - isCutAround.length) : 0;
  const filteredList = applySortFilter(
    isCutAround,
    getComparator(order, orderBy),
    filterName
  );
  const isUserNotFound = filteredList.length === 0;

  return (
    <div>
      {" "}
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
        >
          <Typography variant="h4" gutterBottom sx={{ mt: "16px" }}>
            รายงานการตัดรอบทั้งหมด
          </Typography>
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
                  rowCount={isCutAround.length}
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
                        cutaround_timestamp,
                        cutaround_transaction,
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
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {_id}
                            </div>
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
                              {dayjs(cutaround_timestamp)
                                .locale("th")
                                .add(543, "year")
                                .format("DD MMMM YYYY HH:mm")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div
                              style={{
                                fontWeight: "bold",
                                fontSize: "14px",
                              }}
                            >
                              {cutaround_transaction}
                            </div>
                          </TableCell>

                          <TableCell display="flex">
                            <Link
                              href={{
                                pathname: "/report/old-cut-around/detail/[id]",
                                query: {
                                  id: row._id,
                                  partner_name: partner_name,
                                },
                              }}
                            >
                              <Tooltip title="ดูรายละเอียดการตัดรอบ">
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
                              </Tooltip>
                            </Link>
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
