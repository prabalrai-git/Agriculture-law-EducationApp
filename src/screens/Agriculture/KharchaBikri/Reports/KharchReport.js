import * as React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import {numberWithCommas} from '../../../../Helpers/NumberToMoney';
import {GetBaaliKharchaDetailsByUserBaaliIdApi} from '../../../../Services/appServices/agricultureService';

const optionsPerPage = [2, 3, 4];

const KharchReport = ({route}) => {
  const {userCode, ProdCropID, baaliId} = route.params;

  const [page, setPage] = useState(0);
  const [tableData, setTableData] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    const data = {
      userId: userCode,
      prodId: ProdCropID,
      baaliId: baaliId,
    };
    // console.log(route);
    GetBaaliKharchaDetailsByUserBaaliIdApi(data, res => {
      setTableData(res);
    });
  }, []);

  var total = 0;
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
          कुल खर्च रकम: Rs.
          {tableData?.forEach(number => (total += number.TotalCost))}
          <Text style={{fontSize: 14}}>{numberWithCommas(total)}</Text>
        </Text>
      </View>
      <DataTable>
        <DataTable.Header style={{backgroundColor: '#4cbb17', marginTop: 5}}>
          <DataTable.Title textStyle={styles.headerTxt}>
            खर्च शीर्षक
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
              return (
                <DataTable.Row
                  key={index}
                  style={{
                    padding: 5,
                    backgroundColor: index % 2 === 0 ? '#EACCD1' : 'white',
                  }}>
                  <DataTable.Cell
                    textStyle={{
                      color: '#DE4842',
                      fontSize: 12,
                      flexWrap: 'wrap',
                    }}>
                    {item.KharchaHead}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 12,
                      flexWrap: 'wrap',
                    }}
                    numeric>
                    {item.ResourceAmount} {item.KUnit}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 12,
                      flexWrap: 'wrap',
                    }}
                    numeric>
                    Rs.{numberWithCommas(item.ResourceRate)}
                  </DataTable.Cell>
                  <DataTable.Cell
                    textStyle={{
                      fontSize: 12,
                      flexWrap: 'wrap',
                    }}
                    numeric>
                    Rs.{numberWithCommas(item.TotalCost)}
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </View>
        </ScrollView>

        {/* <DataTable.Row>
        <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
        <DataTable.Cell numeric>237</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
        <DataTable.Cell numeric>8.0</DataTable.Cell>
      </DataTable.Row> */}

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

export default KharchReport;

const styles = StyleSheet.create({
  headerTxt: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
