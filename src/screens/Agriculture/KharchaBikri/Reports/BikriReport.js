import * as React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {numberWithCommas} from '../../../../Helpers/NumberToMoney';
import {GetSalesDetailsofActiveProductionByUserApi} from '../../../../Services/appServices/agricultureService';

const optionsPerPage = [2, 3, 4];

const BikriReport = ({route}) => {
  const {userCode} = route.params;

  //   const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState();
  //   const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    const data = {
      userId: userCode,
    };

    GetSalesDetailsofActiveProductionByUserApi(data, res => {
      // console.log(res, 'this is res');
      if (res.length > 0) {
        // console.log(res, 'yo');
        setTableData(res);
      }
    });
  }, []);

  //   useEffect(() => {
  //     setPage(0);
  //   }, [itemsPerPage]);

  let total = 0;

  return (
    <>
      <View>
        <Text
          style={{
            color: 'black',
            fontWeight: '500',
            alignSelf: 'flex-end',
            fontSize: 16,
            marginRight: 10,
            marginTop: 15,
          }}>
          कुल बिक्री रकम: Rs.
          {tableData?.forEach(number => (total += number.TotalAmount))}
          <Text style={{fontSize: 14}}>{numberWithCommas(total)}</Text>
        </Text>
      </View>
      {/* <ScrollView></ScrollView> */}
      <DataTable>
        <DataTable.Header style={{backgroundColor: '#4cbb17', marginTop: 5}}>
          <DataTable.Title textStyle={styles.headerTxt}>
            खरिदकर्ता
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerTxt} numeric>
            मात्रा
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerTxt} numeric>
            दर
          </DataTable.Title>
          <DataTable.Title textStyle={styles.headerTxt} numeric>
            रकम
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          <View style={{marginBottom: 140}}>
            {tableData?.map((item, index) => {
              //   console.log(index, 'this index');
              return (
                <DataTable.Row
                  key={index}
                  style={{
                    padding: 5,
                    backgroundColor: index % 2 === 0 ? '#f3f7f0' : 'white',
                  }}>
                  <DataTable.Cell
                    // style={{flex: 1.5}}
                    textStyle={{
                      color: 'green',
                      fontSize: 12,
                      flex: 1,
                      flexWrap: 'wrap',
                    }}>
                    {item.VendorName}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 12,
                      flexWrap: 'wrap',
                    }}
                    numeric>
                    {item.Quantity}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 12,

                      flexWrap: 'wrap',
                    }}
                    numeric>
                    Rs.{item.Rate}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 12,

                      flexWrap: 'wrap',
                    }}
                    numeric>
                    Rs.{numberWithCommas(item.TotalAmount)}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </View>
        </ScrollView>

        {/* <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={page => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      /> */}
      </DataTable>
    </>
  );
};

export default BikriReport;

const styles = StyleSheet.create({
  headerTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
