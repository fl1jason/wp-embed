import React from 'react';

const FeatureItem = ( { feature, features, onSelectFeature } ) =>
{
  return (
    <div>
        <label class="inline-flex items-center">
            <input
            type="checkbox"
            class="form-radio"
            name={feature.name}
            value={feature.name}
            checked={features.includes(feature.name)}
            onChange={e => onSelectFeature(e.target.value)} 
            />
            <span class="ml-2">{feature.description}</span>
        </label>
    </div>
  )
}

export default FeatureItem;