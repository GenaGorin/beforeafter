import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {IGoalTags} from '../../../interfaces/goalTags';
import {ITag} from '../../../interfaces/tag';
import {getTagsByName} from '../../redux/actions';
import Tag from './Tag';

type TTagsBlock = {
  goalTags: [IGoalTags];
};

function TagsBlock({goalTags}: TTagsBlock) {
  let tagIds = goalTags.map((goalTag: IGoalTags) => goalTag.tag_id);
  const [tagNames, setTagNames] = useState<any>();

  useEffect(() => {
    getTagsByName(tagIds, setTagNames);
  }, []);

  return (
    <View style={{display: 'flex', flexDirection: 'row', marginTop: 15}}>
      {tagNames?.length > 0 &&
        tagNames.map((tag: ITag) => <Tag key={tag.id} tag={tag} />)}
    </View>
  );
}
export default TagsBlock;
