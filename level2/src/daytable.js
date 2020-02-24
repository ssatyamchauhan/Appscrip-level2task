import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(price_change, price_change_pct, volume, volume_change, volume_change_pct, market_cap_change, market_cap_change_pct) {
  return { price_change, price_change_pct, volume, volume_change, volume_change_pct, market_cap_change, market_cap_change_pct };
}



const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();
  var days = props.day.slice(1,props.day.length)
  const rows = [
    createData(...days)
  ];

  return (
    <TableContainer component={Paper}>
      <FilterListIcon style={{float: "right"}}/>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">p_change</StyledTableCell>
            <StyledTableCell align="right">p_change_pct</StyledTableCell>
            <StyledTableCell align="right">volume</StyledTableCell>
            <StyledTableCell align="right">v_change</StyledTableCell>
            <StyledTableCell align="right">v_change_pct</StyledTableCell>
            <StyledTableCell align="right">m_cap_change</StyledTableCell>
            <StyledTableCell align="right">m_cap_chn_pct</StyledTableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{row.price_change}</StyledTableCell>
              <StyledTableCell align="right">{row.price_change_pct}</StyledTableCell>
              <StyledTableCell align="right">{row.volume}</StyledTableCell>
              <StyledTableCell align="right">{row.volume_change}</StyledTableCell>
              <StyledTableCell align="right">{row.volume_change_pct}</StyledTableCell>
              <StyledTableCell align="right">{row.market_cap_change}</StyledTableCell>
              <StyledTableCell align="right">{row.market_cap_change_pct}</StyledTableCell>


            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
