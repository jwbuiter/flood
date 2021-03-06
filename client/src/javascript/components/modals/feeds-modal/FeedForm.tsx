import {FC} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';

import type {Feed} from '@shared/types/Feed';

import {Button, FormRow, FormRowGroup, Select, SelectItem, Textbox} from '../../../ui';

interface FeedFormProps {
  currentFeed: Feed | null;
  defaultFeed: Pick<Feed, 'interval' | 'label' | 'url'>;
  intervalMultipliers: Readonly<Array<{message: string; value: number}>>;
  isSubmitting: boolean;
  onCancel: () => void;
}

const FeedForm: FC<FeedFormProps> = ({
  currentFeed,
  defaultFeed,
  intervalMultipliers,
  isSubmitting,
  onCancel,
}: FeedFormProps) => {
  const intl = useIntl();
  const feedInterval = currentFeed?.interval ?? defaultFeed.interval;

  let defaultIntervalTextValue = feedInterval;
  let defaultIntervalMultiplier = 1;

  intervalMultipliers.forEach((interval) => {
    const intervalMultiplier = interval.value;

    if (feedInterval % intervalMultiplier === 0) {
      defaultIntervalTextValue = feedInterval / intervalMultiplier;
      defaultIntervalMultiplier = intervalMultiplier;
    }
  });

  return (
    <FormRowGroup>
      <FormRow>
        <Textbox
          id="label"
          label={intl.formatMessage({
            id: 'feeds.label',
          })}
          placeholder={intl.formatMessage({
            id: 'feeds.label',
          })}
          defaultValue={currentFeed?.label ?? defaultFeed.label}
        />
        <Textbox
          id="interval"
          label={intl.formatMessage({
            id: 'feeds.select.interval',
          })}
          placeholder={intl.formatMessage({
            id: 'feeds.interval',
          })}
          defaultValue={defaultIntervalTextValue}
          width="one-eighth"
        />
        <Select labelOffset defaultID={defaultIntervalMultiplier} id="intervalMultiplier" width="one-eighth">
          {intervalMultipliers.map((interval) => (
            <SelectItem key={interval.value} id={interval.value}>
              {intl.formatMessage({id: interval.message})}
            </SelectItem>
          ))}
        </Select>
      </FormRow>
      <FormRow>
        <Textbox
          id="url"
          label={intl.formatMessage({
            id: 'feeds.url',
          })}
          placeholder={intl.formatMessage({id: 'feeds.url'})}
          defaultValue={currentFeed?.url ?? defaultFeed?.url}
        />
        <Button labelOffset onClick={onCancel}>
          <FormattedMessage id="button.cancel" />
        </Button>
        <Button labelOffset type="submit" isLoading={isSubmitting}>
          <FormattedMessage id="button.save.feed" />
        </Button>
      </FormRow>
    </FormRowGroup>
  );
};

export default FeedForm;
