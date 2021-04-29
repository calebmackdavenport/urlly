import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Keyboard} from 'react-native';

import {addAirtableUrl, getAirtableList, slugGen} from '../../store/airtable';
import {getHasErrorsOrMissingValues} from '../../util/validation';
import Title from '../../components/Title';
import Input from '../../components/Input';
import SubmitButton from '../../components/Button/SubmitButton';
import ListItem from '../../components/ListItem';

const Home = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm({mode: 'all'});

  const [busy, setBusy] = useState(false);
  const [urlList, setUrlList] = useState([]);
  const requiredInputs = ['url'];

  const onSubmit = async ({url, slug}) => {
    setBusy(true);
    Keyboard.dismiss();
    const newSlug = await slugGen(slug);

    if (slugGen) {
      addAirtableUrl(url, newSlug);
      reset();
      refreshList();
    }

    setBusy(false);
  };

  const refreshList = async () => {
    const list = await getAirtableList();
    if (list) setUrlList(list);
  };

  useEffect(async () => {
    try {
      setBusy(true);
      await refreshList();
    } catch (e) {
      console.log('err: ', e);
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <>
      <Title text={'URL.LY'} />
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <View>
          {urlList.map(url => (
            <ListItem key={url} url={url} />
          ))}
        </View>
        <View>
          <Controller
            name="url"
            control={control}
            defaultValue=""
            render={({field}) => (
              <Input
                field={field}
                name={field.name}
                placeholder={'Enter your url'}
              />
            )}
          />
          <Controller
            name="slug"
            control={control}
            defaultValue=""
            render={({field}) => (
              <Input
                field={field}
                name={field.name}
                placeholder={'Optional: Enter custom slug'}
                maxLength={4}
              />
            )}
          />
          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            disabled={
              busy || getHasErrorsOrMissingValues(errors, watch, requiredInputs)
            }
            busy={busy}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
