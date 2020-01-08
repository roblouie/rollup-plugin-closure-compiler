/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import test from 'ava';
import { createTransforms } from '../../transpile-tests/transforms';
import { defaults } from '../../transpile-tests/options';
import { promises as fsPromises } from 'fs';
import { generator } from '../generator';

test('generate extern for iife name', async t => {
  const externFixtureContent = await fsPromises.readFile(
    'test/iife/fixtures/iife.extern.js',
    'utf8',
  );
  const outputOptions = {
    format: 'iife',
    name: 'wrapper',
  };

  const transforms = createTransforms({});
  const options = await defaults(outputOptions, [], transforms);

  for (const externFilePath of options.externs) {
    const fileContent = await fsPromises.readFile(externFilePath, 'utf8');
    if (fileContent === externFixtureContent) {
      t.pass();
      return;
    }
  }
  t.fail('None of the externs match the expected format');
});

generator('iife', 'iife-wrapped-safely', undefined, ['iife'], undefined, 'wrapper');
